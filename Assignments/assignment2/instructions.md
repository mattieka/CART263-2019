Assignment Instructions - Copy and pasted from github

BRIEF:
- *DONE* Make the food move randomly around on the screen using velocity.
- *DONE* Make the food stay on the screen (either wrapping or constraining).
- *DONE* Use an array of multiple food objects instead of a single object

AN APPROACH:
  Movement
- *DONE* In main program define a constant for the maximum speed of the food
- *DONE* In the Food constructor pass a maximum speed as an argument and save it in a property
- *DONE* In the Food constructor add velocity properties and set them randomly based on maximum speed
- *DONE* Add an update() method to Food that
      - *DONE* updates the position based on its velocity, constrained to the canvas (it shouldn't go off-screen)
      - *DONE* randomly changes the velocity every now and then (either based on probability or time/frames) to a random velocity based on its maximum speed
*DONE* Add to the Food's reset() function so that it randomizes its velocity on reset
*DONE* Call the Food's update() method in draw()

  Multiple foods
- *DONE* Change the food variable declaration to be an empty array
- *DONE* Create multiple food objects in setup() and put them in the array
- *DONE* Update, check for eating, and display all the food objects in the array
