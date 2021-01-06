const Router = require("express").Router();
const controller = require("../controllers/CommentController");

Router.post("/:user_id", controller.CreateComment);
Router.put("/:comment_id", controller.UpdateComment);
Router.delete("/:comment_id", controller.DeleteComment);
Router.put("/like/:comment_id", controller.LikeComment);
Router.put("/unlike/:comment_id", controller.UnlikeComment);
Router.post("/sub/:user_id/:parent_id", controller.CommentOnComment);

module.exports = Router;
