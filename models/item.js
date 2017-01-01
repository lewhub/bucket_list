var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var item_schema = Schema({
    photo: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false }
})

var Item = mongoose.model( "Item" , item_schema );

module.exports = Item;