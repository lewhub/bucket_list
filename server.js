var express = require("express");
var app = express();
var port = 3000;
var morgan = require("morgan");
var mongoose = require("mongoose");
var body_parser = require("body-parser");
var path = require("path");
var dotenv = require("dotenv").config( { silent: true } );
var user_routes = require("./routes/user_rts.js");


mongoose.connect("mongodb://localhost/bucket_list_site", function(err) {
    if (err) return console.log(err)
    console.log("connected to mongo db locally");
})

app.use(morgan("dev"));
app.use(body_parser.urlencoded( { extended: false } ));
app.use(body_parser.json());
app.use("/", express.static(path.join( __dirname , "public" )));

app.use("/users", user_routes);

app.get("/", function(req, res) {
    res.sendFile(path.join( __dirname , "index.html" ));
})

app.listen(port, function(err){
    if (err) return console.log(err)
    console.log("listening on port: " + port);
})

// todo - make partials template files and then make front end signup and login pages with text fields and buttons.
// todo (1.16.17) - make login template with text fields and buttons and then profile view and then back end implementation. 
// todo (1.17.17) - continue signup and login on front end + back end 