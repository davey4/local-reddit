const Router = require("express").Router();
const controller = require("../controllers/UserController");
const { readToken, verifyJwt } = require("../middleware");

Router.post("/register", controller.CreateUser);
Router.post("/login", controller.LoginUser);
Router.get("/refresh/session", readToken, verifyJwt, controller.RefreshSession);

Router.get("/:user_id", controller.GetUser);
Router.get("/", controller.GetAvatars);

module.exports = Router;
