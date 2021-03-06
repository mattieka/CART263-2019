"use strict";

/*****************

Navigating YouTube: Toddler Edition

Navigate YouTube as it is in the current internet climate as a child. Unable to read, users can only make decisions of what "videos" to watch based on the thumbnail images.

******************/

/******************************************************************************
                                VARIABLES
******************************************************************************/

let moodMeter = 0;
let gameState = "play";

/******************************************************************************
                                  SETUP
******************************************************************************/

// Run preload when document is fully loaded
$(document).ready(meterTest);

/******************************************************************************
                                PRELOAD
******************************************************************************/



/******************************************************************************
                            MOOD METER TEST
******************************************************************************/
//testing mood meter. when a positive video experience is had, mood increases.
// when a negative video experience is had, mood decreases.
// the max value is +4, the min is -4. Function checks if these value are hit.
// if max or min is hit, game state changes to lose or win, then runs gameover function


function meterTest() {
  let $meterUp = $("#meterUp");
  let $meterDown = $("#meterDown");

  meterColorCheck();

  $meterUp.click(function() {
    if (moodMeter < 4) {
      moodMeter = moodMeter + 1;
    } else if (moodMeter >= 4) {
      // when mood meter hits +4, game is won. set game state and run gameOver function.
      gameState = "win";
      gameOver();
    }
    meterColorCheck();
    console.log(moodMeter);
  });

  $meterDown.click(function() {
    if (moodMeter > -4) {
      moodMeter = moodMeter - 1;
    } else if (moodMeter <= -4) {
      // when mood meter hits -4, game is lost. set game state and run gameOver function
      gameState = "lose";
      gameOver();
    }
    meterColorCheck();
    console.log(moodMeter);
  });

}

/******************************************************************************
                              GAME OVER STATE
******************************************************************************/

function gameOver() {
  if (gameState == "win") {
    console.log("You win!!");
  } else if (gameState == "lose") {
    console.log("You lose!!");
  }
}


/******************************************************************************
                              METER COLOR CHECK
******************************************************************************/

function meterColorCheck() {
  if (moodMeter >= 3) {
    $("#3").attr('src', "assets/images/metergreen.png");
  } else {
    $("#3").attr('src', "assets/images/meterneutral.png");
  }

  if (moodMeter == 2) {
    $("#2").attr('src','assets/images/metercyan.png');
  } else {
    $("#2").attr('src',"assets/images/meterneutral.png");
  }

  if (moodMeter == 1) {
    $("#1").attr('src','assets/images/metercyan.png');
  } else {
    $("#1").attr('src',"assets/images/meterneutral.png");
  }

  if (moodMeter == 0) {
    $("#0").attr('src','assets/images/metermid.png');
  } else {
    $("#0").attr('src',"assets/images/meterneutral.png");
  }

  if (moodMeter == -1) {
    $("#-1").attr('src',"assets/images/meteryellow.png");
  } else {
    $("#-1").attr('src',"assets/images/meterneutral.png");
  }

  if (moodMeter == -2) {
    $("#-2").attr('src',"assets/images/meteryellow.png");
  } else {
    $("#-2").attr('src',"assets/images/meterneutral.png");
  }

  if (moodMeter <= -3) {
    $("#-3").attr('src',"assets/images/meterred.png");
  } else {
    $("#-3").attr('src',"assets/images/meterneutral.png");
  }

}

/******************************************************************************
                            IMAGE/SOUND CREDIT
******************************************************************************

Happy/Sad faces: https://openclipart.org/user-detail/Technaturally

**/

/******************************************************************************
                                  END
******************************************************************************/
