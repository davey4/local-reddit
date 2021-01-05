const Router = require("express").Router();
const UserRouter = require("./UserRouter");
const SubRouter = require("./SubRedditRouter");
const ThreadRouter = require("./ThreadRouter");
const CommetRouter = require("./CommentRouter");
const NotifRouter = require("./NotificationRouter");
const SubscriptionRouter = require("./SubscriptionRouter");

Router.use("/user", UserRouter);
Router.use("/sub", SubRouter);
Router.use("/thread", ThreadRouter);
Router.use("/comment", CommetRouter);
Router.use("/notif", NotifRouter);
Router.use("/subscription", SubscriptionRouter);

module.exports = Router;
