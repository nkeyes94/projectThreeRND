// * Importing required packages
var express = require("express");
var session = require("express-session");
var mysql = require("mysql") // ! Note: This should be changed to MongoDB
// var passport = require("./config/passport");
var exphbs = require("express-handlebars"); // ! Note: This should be changed to React

// * App configuration
var app = express();

// * Middleware config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// * Handlebars config
// ! Note: This should be changed to React
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// * Passport config
// ! Temporarily disabled for testing
// app.use(session({ secret: "the blue dog jumps over the red moon", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// * Requiring our route file
const routes = require("./routes/routes.js");

var PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
    console.log("Application listening on localhost:/"+ PORT);
})