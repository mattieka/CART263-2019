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
let waitTime = 1000;
let gameListArray = [];

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
  setInterval(generateWaitTime,10);
  $.get("/gamesList.txt", function(data){
    gameListArray = data.split("\n");
    console.log(gameListArray);
    $("li p").each(function(){
      $(this).text(gameListArray[Math.floor(Math.random() * gameListArray.length-1)])
    })
});

  $('#instructionsDialog').dialog({
    modal: true,
    dialogClass: "no-close",
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
      ui.draggable.find("p").removeClass("spineText").addClass("coverText");
      console.log(ui.draggable.attr("class"));

      //console.log(waitTime);
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
       ui.draggable.find("p").removeClass("coverText").addClass("spineText");
       console.log(ui.draggable.attr("class"));
     }
   })
 }

 /******************************************************************************
                          RANDOM NUMBER FOR INTERVAL
 ******************************************************************************/

function generateWaitTime() {
  waitTime = Math.floor(Math.random() * (5000-1000) + 1000);
}

/******************************************************************************
                            NEW GAME LIST ITEM
******************************************************************************/

function newGameDiv() {
  let $nextTitle = (gameListArray[Math.floor(Math.random() * gameListArray.length-1)]);
  let $newGame = $('<li class="listForm"><p class="spineText">'+$nextTitle+'</p></li>');
  $counter.append($newGame);

}

/******************************************************************************
                            BRING UP NEW DIALOG BOX
******************************************************************************/


/******************************************************************************
                                  SOURCES
******************************************************************************/
/*
Game Case Front: http://www.canbum.net/cdn/18/1991/949/xbox-game-cover-template_134936.jpg
Game Case Spine: http://www.canbum.net/cdn/18/1991/949/xbox-360-game-cover-template_134914.png
*/
