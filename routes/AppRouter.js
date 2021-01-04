const Router = require("express").Router();
const UserRouter = require("./UserRouter");
const SubRouter = require("./SubRedditRouter");
const ThreadRouter = require("./ThreadRouter");

Router.use("/user", UserRouter);
Router.use("/sub", SubRouter);
Router.use("/thread", ThreadRouter);

module.exports = Router;
