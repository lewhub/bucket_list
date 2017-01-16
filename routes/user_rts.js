var express = require("express");
var user_router = express.Router();
var user_ctrl = require("../controllers/user_ctrl.js");

user_router.get("/", user_ctrl.index);
user_router.post("/login", user_ctrl.login);
user_router.post("/", user_ctrl.create);



user_router.get("/:id", user_ctrl.show);
user_router.patch("/:id", user_ctrl.update);
user_router.delete("/:id", user_ctrl.delete_account);

module.exports = user_router;