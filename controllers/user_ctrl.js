var User = require("../models/user.js");
var jwt = require("jsonwebtoken");

module.exports = {
    index: function(req, res) {
        User
            .find( { } )
            .exec( function(err, users) {
                if (err) return console.log(err)
                res.json( { sucess: true, message: "All users.", users: users } )
            }) 
    },
    show: function(req, res) {
        User
            .findOne( { _id: req.params.id })
            .exec( function(err, user) {
                if (err) return console.log(err)
                res.json( { success: true, message: "User found.", user: user } )
            })
    },
    create: function(req, res) {
        var user = new User( req.body );
        user.password = user.generateHash( req.body.password );
        user
            .save( function(err, user) {
                if (err) return console.log(err)
                var token = jwt.sign(user.toObject(), process.env.secret, {
                    expiresIn: "1h"
                })
                res.json( { success: true, message: "Account created.", user: user, token: token } )
            })
    },
    update: function(req, res) {
        User
            .findOne( { _id: req.params.id } )
            .exec( function(err, user) {
                if (err) return console.log(err)
                if (req.body.email) {
                    user.email = req.body.email;
                }
                if (req.body.bio) {
                    user.bio = req.body.bio;
                }
                if (req.body.profile_photo) {
                    user.profile_photo = req.body.profile_photo;
                }
                if (req.body.new_password && user.validPassword(req.body.password)) {
                    user.password = user.generateHash(req.body.new_password);
                }
                user.save( function(err, user) {
                    if (err) return console.log(err)
                    res.json( { success: true, message: "Account updated.", user: user } )
                })
            })
    },
    delete_account: function(req, res) {
        User
            .findOneAndRemove( { _id: req.params.id }, function( err ) {
                if (err) return console.log(err)
                res.json( { success: true, message: "Account deleted." } )
            })
                        
    },
    login: function(req, res) {
        User
            .findOne( { email: req.body.email } )
            .exec( function(err, user) {    
                if (err) return console.log(err)
                if (!user) return res.json( { success: false, message: "Account with email provided does not exist." } )
                // todo - finish login back end implementation.
                if (user && !user.validPassword(req.body.password)) return res.json( { success: false, message: "Incorrect Password" } );
                var token = jwt.sign(user.toObject(), process.env.secret, {
                    expiresIn: "1h"
                })
                res.json({ success: true, token: token, user: user, message: "loggged in." });
            })
    }
}