const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersRouter = express.Router();

const {
    createUser,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    getAllUsers,
    deleteUser,
} = require("../db/users");

const { requireLogin, requireAdmin } = require("./utils");

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");

    next();
});

usersRouter.get("/me", requireLogin, async (req, res, next) => {
    const { id } = req.user;
    try {
        const user = await getUserById(id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

//someone please review this delete not sure if this is right!
usersRouter.delete("/:userId", requireLogin, requireAdmin, async (req, res, next) => {
    const {userId} = req.params
    try {
        const user = await getUserById(userId);
        if(user){
            const destoryUser = await deleteUser(userId)
            res.send(destoryUser);
        }
    
    } catch (error) {
        next(error);
    }
});

usersRouter.get("/admin", requireLogin, requireAdmin, async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

// usersRouter.get("/:username/orders", async (req, res, next) => {
//     const { username } = req.params;
//     const userOrders = await getOrdersByUser({ username });
//     res.send(userOrders)

// });

// usersRouter.get("/:username/cart", async (req, res, next) => {
//     const { username } = req.params;
//     const userCart = await getCartByUser({ username });
//     res.send(userCart);
// });

usersRouter.post("/register", async (req, res, next) => {
    const { username, email,  password } = req.body;
    try {
        const _user = await getUserByUsername(username);
        if (_user) {
            next({
                name: "UserExistsError",
                message: "A user by that username already exists",
            });
        }
        const userEmail = await getUserByEmail(email);
        if (userEmail) {
            next({
                name: "EmailExistsError",
                message: "A user with this email already exists",
            });
        }
        else if (password.length < 8) {
            next({
                name: "PasswordLengthError",
                message: "Password must be 8 or more characters",
            });
        } else {
            const user = await createUser({ username, password });
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1w",
                }
            );
            res.send({
                user: user,
                message: "Thank you for signing up!",
                token: token,
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password",
        });
    }
    try {
        const user = await getUserByUsername(username);
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (user && passwordsMatch) {
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                },
                process.env.JWT_SECRET
            );
            delete user.password;
            res.send({
                user: user,
                message: "you're logged in!",
                token: token,
            });
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect",
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = usersRouter;

