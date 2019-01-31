"use strict";

/*****************

OOP Circle Eater
Mattie KA

An Object-Oriented version of the Circle Eater program.
The player moves a circle around with the mouse.
Another circle represents food which the player eats by overlapping.
The player circle shrinks over time, but grows when it eats.

******************/

/******************************************************************************
                                VARIABLES
******************************************************************************/

// Constants for key quantities
const AVATAR_MAX_SIZE = 64;
const AVATAR_SIZE_LOSS_PER_FRAME = 0.5;
const FOOD_MIN_SIZE = 5;
const FOOD_MAX_SIZE = 100;
const FOOD_MAX_SPEED = 8  ;
// Variables to store the two key objects
let avatar;
let food = [];


/******************************************************************************
                                  SETUP
******************************************************************************/

// Create the canvas, avatar, and food, disable the cursor

function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS_PER_FRAME)
  food.push(new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE));
  food.push(new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE));
  food.push(new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE));
  food.push(new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE));
  food.push(new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE));
  noCursor();
}


/******************************************************************************
                                    DRAW
******************************************************************************/

// Clear the background
// Update the avatar and check for eating
// Display the avatar and food

function draw() {
  background(0);
  avatar.update();
  avatar.display();

  for (let i = 0; i < food.length; i++) {
    if (avatar.collide(food[i])) {
      avatar.eat(food[i]);
    }
    food[i].update();
    food[i].display();
  }

}

/******************************************************************************
                                    END
******************************************************************************/