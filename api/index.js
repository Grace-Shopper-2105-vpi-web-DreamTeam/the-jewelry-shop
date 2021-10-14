const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/products", require("./products"));

module.exports = apiRouter;