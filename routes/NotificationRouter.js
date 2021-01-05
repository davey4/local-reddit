const Router = require("express").Router();
const controller = require("../controllers/NotificationsController");

Router.post("/:user_id/:thread_id", controller.CreateNotification);
Router.delete("/:notif_id", controller.DeleteNotification);
Router.get("/:user_id", controller.GetNotification);

module.exports = Router;
