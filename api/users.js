const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersRouter = express.Router();

const {
    createUser,
    getUserById,
    getUserByUsername,
    getUserByEmailAddress,
    getAllUsers,
    deleteUser,
    updateUserToAdminById,
    updateUserById
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

// this only works if we just delete user. Not cart or order 
usersRouter.delete("/admin/:userId", requireAdmin, async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await getUserById(userId);
        if (user) {
            const destoryUser = await deleteUser(userId)
            res.send(destoryUser);
        } else {
            next({
                name: "UserDoesNotExistsError",
                message: "A user by that username does not exists",
            });

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

usersRouter.patch("/admin/:userId", requireLogin, async (req, res, next) => {
    const { userId } = req.params

    try {
        const user = await getUserById(userId);

        if (user) {
            const newAdmin = await updateUserToAdminById(userId)

            res.send(newAdmin);
        } else {
            next({
                name: "UserDoesNotExistsError",
                message: "A user by that username does not exists",
            });

        }

    } catch (error) {
        next(error);
    }
});

// usersRouter.get("/:userId/orders", async (req, res, next) => {
//     const { userId } = req.params;
//     const userOrders = await getUserById({ userId });
//     res.send(userOrders)
// });


// usersRouter.get("/:userId/cart", async (req, res, next) => {
//     const { userId } = req.params;
//     const userCart = await getUserById({ userId });
//     res.send(userCart);
// });

usersRouter.patch('/:userId', requireLogin, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { emailAddress, username } = req.body;
        const updateFields = {};
        if (emailAddress) {

            updateFields.emailAddress = emailAddress;
            await updateUserById(userId, updateFields);
            delete updateFields.emailAddress
        }
        if (username) {

            updateFields.username = username;
            await updateUserById(userId, updateFields);
            delete updateFields.username
        }
        const remadeUser = await getUserById(userId);
        res.send(remadeUser);

    } catch ({ name, message }) {
        next({ name, message });
    }
});

usersRouter.post("/register", async (req, res, next) => {
    const { username, emailAddress, password, isAdmin } = req.body;

    try {
        const user = await getUserByUsername(username);

        if (user) {
           
            next({
                name: "UserExistsError",
                message: "A user by that username already exists",
            });
        }

        const userEmail = await getUserByEmailAddress(emailAddress);

        if (userEmail) {
            next({
                name: "EmailExistsError",
                message: "A user with this email already exists",
            });
        }

        if (password.length < 8) {
        
            next({
                name: "PasswordLengthError",
                message: "Password must be 8 or more characters",
            });
        } else {
            const user = await createUser({ username, emailAddress, password, isAdmin });

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    emailAddress: user.emailAddress


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
        if (!user) {
            next({
                name: "UserDoesNotExist",
                message: "Username or password is incorrect"
            })
        }
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
    } catch (error) {
        console.log("error", error)
        next(error);
    }
});


module.exports = usersRouter;
