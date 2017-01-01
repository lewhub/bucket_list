var express = require("express");
var app = express();
var port = 3000;
var morgan = require("morgan");
var mongoose = require("mongoose");
var body_parser = require("body-parser");
var path = require("path");
var dotenv = require("dotenv").config( { silent: true } );


mongoose.connect("mongodb://localhost/bucket_list_site", function(err) {
    if (err) return console.log(err)
    console.log("connected to mongo db locally");
})

app.use(morgan("dev"));
app.use(body_parser.urlencoded( { extended: false } ));
app.use(body_parser.json());
app.use("/", express.static(path.join( __dirname , "public" )));

app.get("/", function(req, res) {
    res.sendFile(path.join( __dirname , "index.html" ));
})

app.listen(port, function(err){
    if (err) return console.log(err)
    console.log("listening on port: " + port);
})