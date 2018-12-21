// =============================================================
// htmlRoutes
// =============================================================

// use Path module for working with directories and file paths
var path = require("path");

// make HTML routes available externally
module.exports = function (app) {

  // when the user goes to "/survey" GET route displays the survey page
  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  // when we finish certain actions we will drop the user back to "/"
  // this default catch all route will display the home page (home.html)
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

};