// * Importing required packages
var express = require("express");
var session = require("express-session");
var mysql = require("mysql") // ! Note: This should be changed to MongoDB
var passport = require("./config/passport");
var exphbs = require("express-handlebars"); // ! Note: This should be changed to React
var faceapi = require("face-api.js");
var VSR = require("voice-speech-recognition");
var fs = require("fs");

// * Getting date/time for logging
var today = new Date();
var date = today.getMonth() + "-" + today.getDate() + "-" + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes()+ ":" + today.getSeconds();

// * App configuration
var app = express();

// * Handlebars config
// ! Note: This should be changed to React
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// * Middleware config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// * Passport config
app.use(session({ secret: "the blue dog jumps over the red moon", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

module.exports = VSR;

// * Requiring our route file
const routes = require("./routes/routes.js")(app);

var PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
    console.log("Application listening on localhost:/"+ PORT);
    fs.writeFile("./logs/serverLog.txt", "Server successfully started on "+ date + " at " + time, function(err){
        if(err) throw err;
    })
});