function requireLogin(req, res, next) {
    if (!req.user) {
      res.status(401);
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
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