// =============================================================
// server.js is part of friendfinder application
// =============================================================

// =============================================================
// Dependencies
// =============================================================

// use Path module for working with directories and file paths
var path = require("path");

// set up an Express 
var express = require("express");

// add body-parser middleware for parsing incoming request bodies
var bodyParser = require('body-parser');

// set up an Express app instance
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, "./app/public")));

// add in our application routes
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// establish port to listen on
var PORT = process.env.PORT || 8080;

// starts the server to begin listening
app.listen(PORT, function() {
  console.log("Friend Finder is listening on PORT " + PORT);
});
