const Router = require("express").Router();
const UserRouter = require("./UserRouter");
const SubRouter = require("./SubRedditRouter");

Router.use("/user", UserRouter);
Router.use("/sub", SubRouter);

module.exports = Router;
