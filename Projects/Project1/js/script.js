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
