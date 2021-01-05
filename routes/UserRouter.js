const Router = require("express").Router();
const controller = require("../controllers/UserController");
const { readToken, verifyJwt } = require("../middleware");

Router.post("/register", controller.CreateUser);
Router.post("/login", controller.LoginUser);
Router.get("/refresh/session", readToken, verifyJwt, controller.RefreshSession);

Router.get("/:user_id", controller.GetUser);
Router.get("/", controller.GetAvatars);
Router.put("/:user_id", controller.UpdateUser);
Router.put("/password/:user_id", controller.UpdatePassword);

module.exports = Router;
