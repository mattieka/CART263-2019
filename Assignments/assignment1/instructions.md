Assignment Instructions - Copy and pasted from github


- **DONE** Give the food object velocity properties
- **DONE** Give the food a maximum speed property (consider defining this value in a constant separately)
- **DONE** Define an updateFood() function that...
    - updates the food object's position based on its velocity, constrained to the canvas (it shouldn't go off-screen)
    - randomly changes the food's velocity every now and then (either based on probability or time/frames) to a random velocity based on its maximum speed (or you can use setInterval() or a chain of setTimeout()s to do this if you like)
- **DONE** Call updateFood() from draw()
- **DONE** Add code to set a random velocity for the food based on its maximum speed in positionFood()
