// =============================================================
// apiRoutes
// =============================================================

// use Path module for working with directories and file paths
var path = require("path");

// get access to the list of friends
var friendsArray = require("../data/friends.js");

// make API routes available externally
module.exports = function (app) {

  // when the user goes to "/api/friends" the GET route will display 
  // a JSON of all possible friends
  app.get("/api/friends", function (req, res) {
    res.json(friendsArray);
  });

  // when the user clicks the submit button the api/friends POST route 
  // will handle the incoming survey info for the new friend and will  
  // also handle compatibility logic -posted JSON info is in body
  //
  // compatibility algorithm for best match is as follows:
  //   we store the new friends scores in an array called friendScores
  //   we compare these scores with each friend in the friendsArray 
  //   we take the absolute value of the difference of each score and add those giving the match score
  // for example
  //   User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
  //   User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
  //   match score = 2 + 1 + 2 + 0 + 0 + 0 + 0 + 0 + 0 + 0 = 5
  // the closest match will be the user with the least amount of difference.
  app.post("/api/friends", function (req, res) {

    // post gives us new friends input in the body - make sure we are getting it
    var friendInput = req.body;
    console.log("friendInput = " + JSON.stringify(friendInput));
    // store newFriend scores in a temp array for comparison with our stored friends
    var friendScores = friendInput.scores;

    // temp variable used to identify the best match with this new friend
    var bestMatchName = "";     // store the name of the best match
    var bestMatchPhoto = "";    // store the photo link of the best match
    var bestMatchScore = 100;   // temp best matching score
    var bestMatchIndex = -1;    // index of the best matching friend

    // compare new friend scores with each existing friends scores
    for (var i = 0; i < friendsArray.length; i++) {

      // make sure we are properly looping through each friend in the array
      console.log("friend = " + i + "---" + JSON.stringify(friendsArray[i]));

      // calculate differenes for each question
      var tempDiff = 0;
      for (var j = 0; j < friendScores.length; j++) {
        tempDiff += Math.abs(friendsArray[i].scores[j] - friendScores[j]);
      } // end looping through scores of friend i
      // is friendsArray[i] the "best" match for the new friend 
      if (tempDiff < bestMatchScore) {
        // it is the best match so lets save all of this friends information 
        bestMatchScore = tempDiff;
        bestMatchIndex = i;
        bestMatchName = friendsArray[i].name;
        bestMatchPhoto = friendsArray[i].photo;
      }
      console.log("bmScore: " + bestMatchScore + "--- bmIndex: " + bestMatchIndex);
    } // end looping through all friends in the friends array

    // quick test that we did find the best match
    console.log("BFindex " + bestMatchIndex + "----" + "BFname " + bestMatchName);
    // add the new friend to our array of friends
    friendsArray.push(friendInput);
    // now lets send the best match back to the new friend
    var tempFriend = friendsArray[bestMatchIndex];
    // console.log("tempFriend: " + tempFriend);
    // console.log("friendsArr-bestmatch: " + friendsArray[bestMatchIndex]);

    // hard coded to prove this works
    // var myData = {
    //   "name": "BIF",
    //   "photo": "https://clipground.com/images/white-dwarf-clipart-11.jpg"
    // };
    // console.log(myData);
    // res.json(myData);

    var myData = {
      "name" : bestMatchName,
      "photo" : bestMatchPhoto
    };
    console.log(myData);
    res.json(myData);

  }); // end the post
}; // end the modules export