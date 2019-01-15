"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// variables
let player;
let food;
let playerMaxSize = 100;
let playerCurrentSize = 100;
let playerShrinkRate = 0.5;
let foodMinSize = 20;
let foodMaxSize = 80;

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas (800,800);
  player = new Avatar(width/2,height/2,playerCurrentSize,"#00ff00",true,playerMaxSize,playerShrinkRate);
  food = new Food(random(0,width),random(0,height),"#ff0000",true,foodMinSize,foodMaxSize,this.currentSize);
}


// draw()
//
// Description of draw()

function draw() {
  background(0);
  player.display();
  player.update();
  if (player.checkCollision(food) === true) {
    player.ateFood(food);
  }
  food.display();
}
