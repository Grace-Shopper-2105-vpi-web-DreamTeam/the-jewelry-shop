const {
    getUserById
  } = require("../db/users");
  
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
  
const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
  return (req, res, next) => {
    if(atLeastOne) {
      let numParamsFound = 0;
      for(let param of requiredParams) {
        if(req.body[param] !== undefined) {
          numParamsFound++;
        }
      }
      if(!numParamsFound) {
        next({
          name: 'MissingParams',
          message: `Must provide at least one of these in body: ${requiredParams.join(', ')}`
        })
      } else {
        next();
      }
    } else {
      const notSent = [];
      for(let param of requiredParams) {
        if(req.body[param] === undefined) {
          notSent.push(param);
        }
      }
      if(notSent.length) next({
        name: 'MissingParams',
        message: `Required Parameters not sent in body: ${notSent.join(', ')}`
      })
      next();
    }
  }
}
    
module.exports = {
  requireLogin,
  requireAdmin,
  requiredNotSent
}