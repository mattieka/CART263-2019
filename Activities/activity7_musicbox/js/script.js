"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

//variables
let frequencies = [220.00,246.94,277.18,293.66,329.63,369.99,415.30];
let pattern = ["k","s","k","k","s","h","k","b"];
let patternIndex = 0;
let synth;
let kick;
let snare;
let hihat;
let bark;

// preload()
//
// Description of preload

function preload() {

  synth = new Pizzicato.Sound({
    source: 'wave'
  });

  kick = new Pizzicato.Sound("assets/sounds/kick.wav");
  snare = new Pizzicato.Sound("assets/sounds/snare.wav");
  hihat = new Pizzicato.Sound("assets/sounds/hihat.wav");
  bark = new Pizzicato.Sound("assets/sounds/bark.wav");
}


// setup()
//
// Description of setup

function setup() {

}


// draw()
//
// Description of draw()

function draw() {


}


//-----functions------//

function playNote() {

  let frequency = frequencies[floor(random() * frequencies.length)];
  synth.frequency = frequency;
  synth.play();

}

//--

function playDrum() {
  let symbols = pattern[patternIndex];
  if (symbols.indexOf("k") !== -1) {
    kick.play();
  } else if (symbols.indexOf("s") !== -1) {
    snare.play();
  } else if (symbols.indexOf("h") !== -1) {
    hihat.play();
  } else if (symbols.indexOf("b") !== -1) {
    bark.play();
    console.log("woof");
  }

  if (patternIndex < pattern.length-1) {
    patternIndex = patternIndex + 1;
  } else {
    patternIndex = 0;
  }
}

//--

function mousePressed() {
  setInterval(playNote,500);
  setInterval(playDrum,250);
}
