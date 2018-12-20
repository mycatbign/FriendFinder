// =============================================================
// apiRoutes
// =============================================================

// use Path module for working with directories and file paths
var path = require('path');

// get access to the list of friends
var friendsArray = require('../data/friends.js');

// make API routes available externally
module.exports = function (app) {

  // when the user goes to "/api/friends" the GET route will display 
  // a JSON of all possible friends
  app.get('/api/friends', function (req, res) {
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
  app.post('/api/friends', function (req, res) {

    // the post will give us the new friends input in the body
    // lets make sure we are getting data from the post successfully
    var friendInput = req.body;
    console.log("=============================================================");
    console.log('friendInput = ' + JSON.stringify(friendInput));
    console.log("=============================================================");

    // lets store the newFriend scores in a temporary array for comparison with our stored friends
    // and make sure we are getting the right data
    var friendScores = friendInput.scores;
    console.log('friendScores = ' + friendScores);
    console.log("=============================================================");

    // set up temp variable used to identify the best match with this new friend
    var bestMatchName = '';     // store the name of the best match
    var bestMatchPhoto = '';    // store the photo link of the best match
    var bestMatchScore = 100;   // temp best matching score
    var bestMatchIndex = -1;    // index of the best matching friend
    console.log("Name: " + bestMatchName + "---Photo: " + bestMatchPhoto + "---Score: " + bestMatchScore + "---Index: " + bestMatchIndex)
    console.log("=============================================================");

    // we will compare the new friend with all of the existing friends in the
    // array that is initially stored in friends.js but added to as this program runs
    for (var i = 0; i < friendsArray.length; i++) {

      // make sure we are properly looping through each friend in the array
      console.log('friend = ' + i + "---" + JSON.stringify(friendsArray[i]));

      // calculate differenes for each question
      var tempDiff = 0;
      for (var j = 0; j < friendScores.length; j++) {
        tempDiff += Math.abs(friendsArray[i].scores[j] - friendScores[j]);
      } // end looping through scores of friend i

      // see if this is the "best" match for the new friend 
      if (tempDiff < bestMatchScore) {
        // it is the best match so lets save all of this friends information 
        bestMatchScore = tempDiff;
        bestMatchIndex = i;
        bestMatchName = friendsArray[i].name;
        bestMatchPhoto = friendsArray[i].photo;
      }
      console.log("bmScore: " + bestMatchScore + "--- bmIndex: " + bestMatchIndex);
      console.log("=============================================================");
    } // end looping through all friends in the friends array

    // quick confirmation that we did find the best match
    console.log("BFindex " + bestMatchIndex);
    console.log("BFname " + bestMatchName);
    console.log("BFphoto " + bestMatchPhoto);
    console.log("=============================================================");

    // now we can add the new friend to our array of friends
    // NOTE - have to add it here as opposed to further up or it will be a perfect match with itself
    friendsArray.push(friendInput);
    console.log("Confirm Push: " + JSON.stringify(friendsArray));
    console.log("=============================================================");

    // now lets send the best match back to the new friend
    var tempFriend = friendsArray[bestMatchIndex];
    console.log("=============================================================");
    console.log('tempFriend-JSON: ' + JSON.stringify(tempFriend));
    console.log("=============================================================");

    res.json(tempFriend);

    // res.json({ status: 'OK', bestMatchName: bestMatchName, bestMatchPhoto: bestMatchPhoto });

    // FAILS     res.json({ name: bestMatchName, photo: bestMatchPhoto });
    // FAILS - res.json(tempFriend);
    // FAILS - res.send(tempFriend);
    // FAILS - res.json({ bestMatchName: bestMatchName, bestMatchPhoto: bestMatchPhoto });
    // FAILS - res.json({ status: 'OK', bestMatchName: bestMatchName, bestMatchPhoto: bestMatchPhoto });
    // FAILS - res.json(tempFriend);


  }); // end the post
}; // end the modules export