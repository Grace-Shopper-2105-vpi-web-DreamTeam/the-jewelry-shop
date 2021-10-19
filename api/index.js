const express = require('express');
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
const {getUserById} = require("../db/users");
const {JWT_SECRET} = process.env;


apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
    const { id } = jwt.verify(token, JWT_SECRET);
    if (id) {
    req.user = await getUserById(id);
    next();
    }
} catch ({name, message}) {
    next ({name, message});
}
  }else {
      next ({
          name: "AuthorizationHeaderError",
          message: `Authorization token must start with ${prefix}`,
      });
  }
});

apiRouter.use("/products", require("./products"));
apiRouter.use('/users', require('./users'));

apiRouter.use((error, req, res, next) => {
    res.send(error);
  });
  
module.exports = apiRouter;