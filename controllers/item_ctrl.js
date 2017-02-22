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
                new_item.user = user._id;
                new_item.user_email = user.email;
                new_item.save( function(err, item) {
                    if (err) return console.log(err)
                    user.items.push( item );
                    user.save( function(err, user) {
                        if (err) return console.log(err)
                        res.json( { success: true, message: "item added", user: user } )
                    })
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
    },
    update_status: function(req, res) {
        Item
            .findOne({_id: req.params.id})
            .exec( function(err, item) {
                
                if (err) return console.log(err)
                console.log(1, req.body)
                console.log(2, item)
                console.log(3, item.completed)
                
                if (req.body.status !== undefined) {
                    item.completed = req.body.status;
                }
                if (req.body.description !== undefined) {
                    item.description = req.body.description;
                }
                item.save( function(err, item) {
                    if (err) return console.log(err)
                    res.json({ success: true, message: "item updated", item: item })
                })
            })
    },
    index_user_items: function(req, res) {
        User
            .findOne({_id: req.params.id})
            .exec( function(err, user) {
                if (err) return console.log(err)
                Item
                .find( { user: user._id } )
                .exec( function(err, items) {
                    if (err) return console.log(err)
                    res.json( { success: true, message: "items for user", items: items } )
                })
            })
        
    },
    delete_item: function(req, res){
        console.log(1, req)
        console.log(2, req.body)
        User
            .findOne( { _id: req.params.id } )
            .exec( function(err, user) {
                if (err) return console.log(err)
                console.log(3, req.body)
                user.items.pull({ _id: req.body.item_id });
                user.save( function(err, user) {
                    if (err) return console.log(err)
                    Item
                        .findOneAndRemove({_id: req.body.item_id}, function(err) {
                            if (err) return console.log(err)
                            res.json( { success: true, message: "item deleted", user: user } );
                        })
                   
                })
            })
    } 
}