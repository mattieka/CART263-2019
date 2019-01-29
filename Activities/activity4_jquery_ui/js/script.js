/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

//variables

let $fly;
let $mouth;

let buzzSFX = new Audio("assets/sounds/buzz.mp3");
let crunchSFX = new Audio("assets/sounds/crunch.wav");

//main script
$(document).ready(setup);


// setup function
function setup() {
  $fly = $("#fly");
  $mouth = $("#mouth");
  buzzSFX.loop = true;
  dragFly();
  mouthDrop();

}

//FUNCTIONS ////////////////////////////////////////////////
// drag fly function
function dragFly() {
  $fly.draggable();
  $fly.on('mousedown',function() {
    buzzSFX.play();
  });
}

// mouth droppable function
function mouthDrop() {
  $mouth.droppable({
    drop: function(event,ui) {
      console.log("dropped!");
      ui.draggable.remove();
      setInterval(chew,200);
      buzzSFX.pause();
      crunchSFX.play();
    }
  });
}


// chew function
function chew() {
  if ($mouth.attr("src") === "assets/images/mouth-open.png") {
    $mouth.attr("src", "assets/images/mouth-closed.png");
    crunchSFX.play();
  } else if ($mouth.attr("src") === "assets/images/mouth-closed.png") {
    $mouth.attr("src", "assets/images/mouth-open.png");
  }
}
