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
let randomNextImage;
let upNextIndex;
let currentIndex;

/******************************************************************************
                                  SETUP
******************************************************************************/

// Run preload when document is fully loaded
$(document).ready(function() {

  // warning dialog box for content warning.
  // It doesn't appear unless the user clicks on the text "click for content warning"
  $("#warningBox").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      "Okay": function() {
        $(this).dialog("close");
        $("#warningLink").hide();
      }
    }
  });

  // instructions dialog box to tell users what to do.
  // appears automatically when the page loads.
  $("#instructionsBox").dialog({
    buttons: {
      "Okay": function() {
        $(this).dialog("close");
      }
    },
    modal: true
  });

  // game over dialog box. appears if player wins or loses, and resets the mood meter, default video player image, and reloads a fresh set of videos.
  $("#gameOverDialog").dialog({
    autoOpen: false,
    modal: true,
    dialogClass: "no-close",
    buttons: {
      "Start Over.": function() {
        moodMeter = 0;
        $(this).dialog("close");
        $("#videoPlayerImage").attr('src',"assets/images/screenshots/display/firstvideo.png");
        reloadVideos();
      }
    }
  })
  loadData();
});

/******************************************************************************
                                PRELOAD
******************************************************************************/

// gets json data
function loadData() {
  meterColorCheck();
  $.getJSON("data/related.json",dataLoaded);
}

/******************************************************************************
                                DATA LOADED
******************************************************************************/

function dataLoaded(data) {
  // allows content warning dialog box to pop up if user clicks "click for content warnings"
  $("#warningLink").click(function() {
    $("#warningBox").dialog("open");
  })

  // randomizes the related videos by picking one from the json data and changing the id and image src to reflect the one that was chosen.
  $(".relatedImage").each(function(){
    upNextIndex = Math.floor(Math.random()*data.length);
    console.log(upNextIndex);
    randomNextImage = data[upNextIndex].imageurl;
    $(this).attr('id',upNextIndex);
    $(this).attr('src',randomNextImage);

    // triggers when user clicks on a related video. retrieves the id of the one clicked and changes the video player image to reflect that choice. the mood meter is then adjusted, and voice synthesis commands retrieve the "tag" (good, bad, very good, very bad, or no change) and explanation, then says them out loud. The related videos are then reloaded.
    $(this).click(function() {
      console.log($(this).attr('id'));
      currentIndex = $(this).attr('id');
      $("#videoPlayerImage").attr('src',data[currentIndex].playerurl);
      adjustMoodMeter(data);
      setTimeout(responsiveVoice.speak(data[currentIndex].tag,"UK English Male"),100);
      setTimeout(responsiveVoice.speak(data[currentIndex].explanation, "UK English Male"),1000);
      reloadVideos();
    })
  });
}


/******************************************************************************
                            MOOD METER ADJUST
******************************************************************************/
//adjust mood meter based on last video "watched"
function adjustMoodMeter(data) {
  console.log(currentIndex);
  if (moodMeter < 4 && data[currentIndex].tag == "verygood") {
    moodMeter = moodMeter + 2;
    console.log(moodMeter);
  } else if (moodMeter >= 4) {
    gameState = "win";
    gameOver();
  }

  if (moodMeter < 4 && data[currentIndex].tag == "good") {
    moodMeter = moodMeter + 1;
    console.log(moodMeter);
  } else if (moodMeter >= 4) {
    gameState = "win";
    gameOver();
  }

  if (gameState == "play" && data[currentIndex].tag == "no change") {

  }

  if (moodMeter > -4 && data[currentIndex].tag == "bad") {
    moodMeter = moodMeter - 1;
  } else if (moodMeter <= -4) {
    // when mood meter hits -4, game is lost. set game state and run gameOver function
    gameState = "lose";
    gameOver();
  }

  if (moodMeter > -4 && data[currentIndex].tag == "verybad") {
    moodMeter = moodMeter - 2;
  } else if (moodMeter <= -4) {
    // when mood meter hits -4, game is lost. set game state and run gameOver function
    gameState = "lose";
    gameOver();
  }

  meterColorCheck();
}

/******************************************************************************
                            RELOAD VIDEOS
******************************************************************************/

function reloadVideos() {
  $(".relatedImage").attr("id","null");
  loadData();
}

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
// when the moodmeter reaches its minimum or maximum, a change in win state occurs. a dialog box pops up to inform the player, then gives them the option to start over.
function gameOver() {
    if (gameState == "win") {
    console.log("You win!!");
    $("#gameOverDialog").dialog("open");
    $("#gameOverDialog").text("You win. You successfully avoided too much harmful content.");
  } else if (gameState == "lose") {
    console.log("You lose!!");
    $("#gameOverDialog").dialog("open");
    $("#gameOverDialog").text("You lose. You were unable to avoid harmful content.");
  }
}


/******************************************************************************
                              METER COLOR CHECK
******************************************************************************/
//controls the colour of the mood meter based on current number of points.

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
                              IMAGE CREDIT
******************************************************************************

Happy/Sad faces: https://openclipart.org/user-detail/Technaturally
**/

/******************************************************************************
                                  END
******************************************************************************/
