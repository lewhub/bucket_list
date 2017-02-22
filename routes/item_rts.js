var express = require("express");
var item_router = express.Router();
var item_ctrl = require("../controllers/item_ctrl.js");

item_router.post("/:id", item_ctrl.create)

item_router.get("/", item_ctrl.index);
item_router.get("/:id", item_ctrl.show);
item_router.get("/all/:id", item_ctrl.index_user_items)
item_router.patch("/update/:id", item_ctrl.update_status)
item_router.post("/delete/:id", item_ctrl.delete_item)

module.exports = item_router;