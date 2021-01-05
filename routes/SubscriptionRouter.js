const Router = require("express").Router();
const controller = require("../controllers/SubscriptionController");

Router.post("/:user_id/:sub_id", controller.CreateSub);
Router.delete("/:user_id/:sub_id", controller.UnSub);
Router.get("/:user_id", controller.GetSubs);

module.exports = Router;
