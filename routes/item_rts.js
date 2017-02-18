var express = require("express");
var item_router = express.Router();
var item_ctrl = require("../controllers/item_ctrl.js");

item_router.post("/:id", item_ctrl.create)

item_router.get("/", item_ctrl.index);
item_router.get("/:id", item_ctrl.show);

module.exports = item_router;