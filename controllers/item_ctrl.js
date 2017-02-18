var Item = require("../models/item.js");
var User = require("../models/user.js");

module.exports = {
    index: function(req, res) {
      Item
        .find({})
        .exec( function(err, items) {
            if (err) return console.log(err)
            res.json( { success: true, message: "all items", items: items } );
        })
    },
    create: function(req, res) {
        var new_item = new Item( req.body );
        User
            .findOne({ _id: req.params.id })
            .exec( function(err, user){
                if (err) return console.log(err)
                user.items.push( new_item );
                user.save( function(err, user) {
                    if (err) return console.log(err)
                    res.json( { success: true, message: "item added", user: user } )
                })
            })
    },
    show: function(req, res) {
        User
            .findOne({_id: req.params.id})
            .exec( function(err, user) {
                if (err) return console.log(err)
                var item = user.items.id(req.body.item_id);
                res.json({success: true, message: "item found", item: item});
            })
    }
}