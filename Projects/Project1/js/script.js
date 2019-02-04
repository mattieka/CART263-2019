/*****************

Game Shelving Simulator
By Mattie KA

Have you ever wondered what it's like to work in video game retail and to have to shelve dozens and dozens of near-obsolete games?? Wonder no longer!

******************/
"use strict";


/******************************************************************************
                                VARIABLES
******************************************************************************/

let $counter;
let $shelf;
let waitTime;

$(document).ready(setup);

/******************************************************************************
                                  SETUP
******************************************************************************/

function setup() {
  $counter = $('#counter');
  $shelf = $('#shelf');
  allowConnection();
  addToShelf();
  addToCounter();
  setInterval(generateWaitTime,1000);

  $('#instructionsDialog').dialog({
    modal: true,
    buttons: {
      OK: function() {
        $(this).dialog("close");
        setInterval(newGameDiv,waitTime)
      }
    }
  })
}


/******************************************************************************
                              ALLOW CONNECTION
******************************************************************************/

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

function addToShelf() {
  $shelf.droppable({
    drop: function(event,ui) {
      ui.draggable.attr("class","gridForm");
      console.log(ui.draggable.attr("class"));

      console.log(waitTime);
    }
  })
}

/******************************************************************************
                              COUNTER DROPPABLE
******************************************************************************/
 function addToCounter() {
   $counter.droppable({
     drop: function(event,ui) {
       ui.draggable.attr("class","listForm");
       console.log(ui.draggable.attr("class"));
     }
   })
 }

 /******************************************************************************
                          RANDOM NUMBER FOR INTERVAL
 ******************************************************************************/

function generateWaitTime() {
  waitTime = Math.floor(Math.random() * (7000-1000)) + 1000;
}

/******************************************************************************
                                  NEW GAME DIV
******************************************************************************/

function newGameDiv() {
  let $newGame = $('<li class="listForm">NextGame</li>');
  $counter.append($newGame);
}
