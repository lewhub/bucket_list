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
        console.log(1, req.params)
        User
            .findOne( { _id: req.params.id })
            .exec( function(err, user) {
                if (err) return console.log(err)
                var privileges = String(user._id) === req.decoded._id;
                res.json( { success: true, message: "User found.", user: user, privileges: privileges } )
            })
    },
    guest_show: function(req, res) {
        User
            .findOne({ _id: req.body.user_id })
            .exec( function(err, user) {
                if (err) return console.log(err)
                res.json({ success: true, message: "user found", user: user, privileges: false})
            })
    },
    create: function(req, res) {
        var user = new User( req.body );
        user.password = user.generateHash( req.body.password );
        if (user.validPassword(req.body.confirm_password)) {
            user
                .save( function(err, user) {
                    if (err) {
                        if (err.code === 11000) {
                            return res.json( { success: false, message: "Email already registered." } );
                        } else {
                            return console.log(err)
                        }
                        
                    }
                    var token = jwt.sign(user.toObject(), process.env.secret, {
                        expiresIn: "1h"
                    })
                    res.json( { success: true, message: "Account created.", user: user, token: token } )
                })
        } else {
            res.json( { success: false, message: "Passwords do not match." } )
        }
       
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
    },
    verify_user: function(req, res, next) {
        // if (req.method === "GET") {
        //     req.decoded = {_id: null}
        //     next();
        // } else {
            console.log(1, "in verify user route")
            var token = req.body.token || req.query.token || req.headers["x-access-token"];
            console.log(2, token)
            if (token) {    
                jwt.verify(token, process.env.secret, function(err, decoded){
                    if (err) return res.json( { success: false, message: "token expired" } )
                    req.decoded = decoded;
                    console.log(3, decoded);
                    next();
                })
            } else {
                return res.json( { success: false, message: "token not found" } )
            }
        
        
    },
    login_introduction: function(req, res) {
        var token = req.body.token || req.query.token || req.headers["x-access-token"];

        if (token) {
            jwt.verify(token, process.env.secret, function(err, decoded) {
                if (err) return res.json( { success: false, message: "token expired" } )
                res.json({success: true, message: "token verified", user: decoded})
            })
        } else {
            return res.status.json( { success: false, message: "token not found in request" } );
        }
    }
}