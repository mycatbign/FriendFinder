# FriendFinder

##Description
Friend Finder is a simple friend matching algorithm that asks users a series of questions then compares those answers with an array of existing individuals. Questions are answered on a likert scale from 1 strongl disagree to 5 strongly agree.  Once answers are submitted the algorithm will identify the best match. 

The matching algorithm works as follows:
- we store the new friends scores in an array
- we compare these scores with each friend in our dataset
- we take the absolute value of the difference of each score and add those giving the match score for example:
  User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
  User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
  match score = 2 + 1 + 2 + 0 + 0 + 0 + 0 + 0 + 0 + 0 = 5
- the closest match will be the user with the least amount of difference and that will be displayed back to the user.

This application uses Node.js and Express server on the back end and Bootstrap on the front end.

##Demo
Friend Finder is deployed on Heroku and you can try it [here](https://jbond-friend-finder.herokuapp.com/).

##Notes
Friend Finder locally runs on Port 8080.
