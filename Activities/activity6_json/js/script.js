"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let verb = "is";


$(document).ready(setup);

function setup() {
  $.getJSON("data/data.json",dataLoaded);
}

function dataLoaded(data) {
  console.log(data);
  let cat = getRandomElement(data.cats);
  let condiment = getRandomElement(data.condiments);
  let room = getRandomElement(data.rooms);

  console.log(cat);
  console.log(room);
  console.log(condiment);
  if (condiment.charAt(condiment.length-1) == "s") {
    verb = "are";
    } else {
      verb = "is";
  }
  console.log(verb);
  let description = `${condiment} ${verb} is like a ${cat} in a ${room}`;
  $(document.body).append(description);
}


function getRandomElement(array) {
  let randomElement = array[Math.floor(Math.random()*array.length)];
  return randomElement;
}
