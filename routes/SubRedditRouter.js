const Router = require("express").Router();
const controller = require("../controllers/SubRedditController");

Router.post("/:user_id", controller.CreateSub);
Router.put("/:sub_id", controller.UpdateSub);
Router.delete("/:sub_id", controller.DeleteSub);
Router.get("/", controller.GetAllSubs);

module.exports = Router;
