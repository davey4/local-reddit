const Router = require("express").Router();
const controller = require("../controllers/ThreadController");

Router.post("/:user_id", controller.CreateThread);
Router.put("/:thread_id", controller.UpdateThread);
Router.delete("/thread_id", controller.DeleteThread);
Router.get("/all/:sub_id", controller.GetAllThreads);
Router.get("/:thread_id", controller.GetThread);

module.exports = Router;
