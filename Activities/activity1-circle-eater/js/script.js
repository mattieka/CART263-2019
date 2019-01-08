/*****************

Circle Eater Activity
Mattie KA

Circle that eats things i guess

******************/

"use strict";

/******************************************************************************
                              SECTION NAME
******************************************************************************/


/******************************************************************************
                                VARIABLES
******************************************************************************/

let avatar = {
  x: 0,
  y: 0,
  maxSize: 100,
  currentSize: 60,
  isPlayerAlive: true,
  color: "#cc99ff"
};

let food = {
  x: 0,
  y: 0,
  size: 30,
  color: "#00ccff"
};

const grow = 25;
const shrink = 0.5;

/******************************************************************************
                                  SETUP
******************************************************************************/

function setup() {
  createCanvas(800,500);
  resetFood();
  noCursor();
}

/******************************************************************************
                                    DRAW
******************************************************************************/

function draw() {
  background("#000066");
  if (avatar.isPlayerAlive === true) {
    updatePlayerPosition();
    checkCollision();
    displayAvatar();
    displayFood();
  } else if (avatar.isPlayerAlive === false) {
    deathText();
  }


}

/******************************************************************************
                                  FUNCTIONS
******************************************************************************/

//UPDATE PLAYER POSITION----------------------------------------
function updatePlayerPosition() {
  avatar.x = mouseX;
  avatar.y = mouseY;
  avatar.currentSize = avatar.currentSize - shrink;
  avatar.currentSize = constrain(avatar.currentSize,0,avatar.maxSize);
  if (avatar.currentSize === 0) {
    avatar.isPlayerAlive = false;
  }
  else {
    avatar.isPlayerAlive = true;
  }
}

//DISPLAY AVATAR ---------------------------------------
function displayAvatar() {
  push();
    noStroke();
    fill(avatar.color);
    ellipse(avatar.x,avatar.y,avatar.currentSize,avatar.currentSize);
  pop();
}

//DISPLAY FOOD --------------------------------------------
function displayFood() {
  push();
    noStroke();
    fill(food.color);
    ellipse(food.x,food.y,food.size,food.size);
  pop();
}

//CHECK COLLISION -------------------------------------------
function checkCollision() {
  let distance = dist(avatar.x,avatar.y,food.x,food.y);
  if (distance < avatar.currentSize/2 + food.size/2) {
    avatar.currentSize = avatar.currentSize + grow;
    console.log(avatar.currentSize);
    avatar.currentSize = constrain(avatar.currentSize + grow,0,avatar.maxSize);
    resetFood();
  }
  else {
    //nothing
  }
}

//RESET FOOD POSITION ---------------------------------
function resetFood() {
  food.x = random(0,width);
  food.y = random(0,height);
}

//DEATH TEXT -------------------------------------------
function deathText() {
  push();
    textSize(32);
    fill("#ff3300");
    textAlign(CENTER);
    text("You Died ):",width/2,height/2);
  pop();
}

/******************************************************************************
                                    END
******************************************************************************/
