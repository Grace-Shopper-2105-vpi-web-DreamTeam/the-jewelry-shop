const {
  getUserById,
} = require("../db/users");

async function requireLogin(req, res, next) {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await getUserById(id)
    if (!user) {
      res.status(401);
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
    next();
  }
}

  async function requireAdmin(req, res, next) {
    const user = await getUserById(req.user.id);
    if (!user.isAdmin) {
      res.status(401);
      next({
        name: "MissingAdminStatus",
        message: "Only admins can preform this function"
      });
    }

    next();
  }

  module.exports = {
    requireLogin,
    requireAdmin
  }