"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

//variables
let animals = [
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ];
let correctAnimal;
let answers = [];
const NUM_OPTIONS = 5;


$(document).ready(setup);

function setup() {
  let $click = $("#click");
  $click.on('click',startGame);
}

//starts the game by calling the first round
function startGame() {
  let $click = $("#click");
  $click.remove();
  console.log("Game Start!");
  newRound();
}

//adds a new button as a div and gives it text stored in the label
function addButton(label) {
  let $button = $('<div class="guess"></div>');
  $button.text(label);
  $button.button();
  $button.on('click',buttonClick);
  $('body').append($button);
}


// when a button is clicked
function buttonClick() {
  if ($(this).text()===correctAnimal) {
    console.log("Correct!");
    $('.guess').remove();
    setTimeout(newRound,500);
  } else {
    console.log("Wrong!");
    speakAnimal(correctAnimal);
    $(this).effect('shake');
  }
}


//starts a new round
function newRound() {
  answers = [];
  let i;
  for (i = 0; i<NUM_OPTIONS; i++) {
    let chooseAnimal = animals[Math.floor(Math.random() * animals.length)];
    addButton(chooseAnimal);
    answers.push(chooseAnimal);

  }
  let chooseCorrect = answers[Math.floor(Math.random() * answers.length)];
  correctAnimal = chooseCorrect;
  speakAnimal(correctAnimal);
}

// speech!!!!!
function speakAnimal(name) {
  let reverseName = name.split('').reverse().join('');
  let voiceOptions = {
    rate: Math.random(),
    pitch: Math.random()
  };
  responsiveVoice.speak(reverseName,"UK English Female",voiceOptions);
}
