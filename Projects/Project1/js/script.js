/*****************

Game Shelving Simulator
By Mattie KA

Have you ever wondered what it's like to work in video game retail and to have to shelve dozens and dozens of near-obsolete games?? Wonder no longer!
Drag and drop games from the "shelf" to the "grid" and alphabetize them.


******************/
"use strict";


/******************************************************************************
                                VARIABLES
******************************************************************************/

// Variables for counter and shelf
let $counter;
let $shelf;

// Array for game titles
let gameListArray = [];

// SFX variables
let stackSFX = new Audio ("assets/sounds/gameOnCounter.wav");
let shelfSFX = new Audio ("assets/sounds/moveGame.wav");

// Run setup when document is fully loaded
$(document).ready(setup);

/******************************************************************************
                                  SETUP
******************************************************************************/
// setup function that allows dragging and dropping to, from, and between two jquery UI lists, loads game names, and opens up the instructions dialog box.
function setup() {
  $counter = $('#counter');
  $shelf = $('#shelf');
  allowConnection();
  addToShelf();
  addToCounter();

// loads list of games from text file into an array, then pulls 5 random titles from that list and loads them into the <p> tag of each list item of the five default games.
  $.get("/gamesList.txt", function(data){
    gameListArray = data.split("\n");
    $("li p").each(function(){
      $(this).text(gameListArray[Math.floor(Math.random() * gameListArray.length-1)])
    })
});

// sends a dialog box containing instructions to the user. Closing the dialog box triggers two functions that will generate "customer" dialog boxes and new games to be added to the counter stack.
  $('#instructionsDialog').dialog({
    modal: true,
    dialogClass: "no-close",
    buttons: {
      OK: function() {
        $(this).dialog("close");
        newGameDiv();
        generateDialog();
      }
    }
  })
}

/******************************************************************************
                              ALLOW CONNECTION
******************************************************************************/


// function that allows the user to drag and drop list items between two different lists. Learned this code with the jquery UI library documentation.
function allowConnection() {
  $counter.sortable({
    connectWith: ".connectedSortable"
  }).disableSelection();
  $shelf.sortable({
    connectWith: ".connectedSortable"
  }).disableSelection();
}

/******************************************************************************
                                SHELF DROPPABLE
******************************************************************************/

// function that makes the shelf(grid) droppable. When a list item is dropped there, its class becomes "gridForm". If it came from the counter list, the spine text is replaced with the cover text. A sound effect is also played when a game is dropped.
function addToShelf() {
  $shelf.droppable({
    drop: function(event,ui) {
      ui.draggable.attr("class","gridForm");
      ui.draggable.find("p").removeClass("spineText").addClass("coverText");
      console.log(ui.draggable.attr("class"));
      shelfSFX.play();
    }
  })
}

/******************************************************************************
                              COUNTER DROPPABLE
******************************************************************************/

// function that makes the counter list droppable. When a list item is dropped there, its class becomes "listForm". If it came from the shelf grid, the cover text is replaced with the spine text. A sound effect is also played when a game is dropped.
 function addToCounter() {
   $counter.droppable({
     drop: function(event,ui) {
       ui.draggable.attr("class","listForm");
       ui.draggable.find("p").removeClass("coverText").addClass("spineText");
       console.log(ui.draggable.attr("class"));
       shelfSFX.play();
     }
   })
 }

/******************************************************************************
                            NEW GAME LIST ITEM
******************************************************************************/

// function that adds the next game to the counter. It grabs a title from the games list array, then creates a new list item with the list form and spine text classes. The title pulled from the array is displayed, and a sound effect plays. The setTimeout function calculates a random time to generate another game. See below for code source.

function newGameDiv() {
  let $nextTitle = (gameListArray[Math.floor(Math.random() * gameListArray.length-1)]);
  let $newGame = $('<li class="listForm"><p class="spineText">'+$nextTitle+'</p></li>');
  $counter.append($newGame);
  stackSFX.play();
  setTimeout(newGameDiv, Math.random() * 6000);

}

/******************************************************************************
                            BRING UP NEW DIALOG BOX
******************************************************************************/

// function that periodically spawns a new dialog box with the dialog text class. A message is appended to it. When the dialog box is closed, the text is removed so that the text doesn't get added over and over every time a new one is generated. Timeout function at the end also randomizes the timing of the creation of these dialog boxes.

function generateDialog() {
  let $dialogText = $("#dialogText");
  $dialogText.append("A customer needs your attention!");
  $dialogText.dialog({
        //autoOpen: false,
        modal: true,
        dialogClass: "no-close",
        buttons: {
          OK: function() {
            $dialogText.dialog("close");
            $dialogText.empty();
      }
    }
  })

  setTimeout(generateDialog, Math.random() * 7000);
}

/******************************************************************************
                                  SOURCES
******************************************************************************/
/*
Set Timeout function for random time learned from here:
https://stackoverflow.com/questions/34656758/javascript-setinterval-with-random-time

Game Case Front: http://www.canbum.net/cdn/18/1991/949/xbox-game-cover-template_134936.jpg
Game Case Spine: http://www.canbum.net/cdn/18/1991/949/xbox-360-game-cover-template_134914.png
*/
