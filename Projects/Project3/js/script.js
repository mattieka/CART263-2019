"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/


/*****************************************************************************
                                  VARIABLES
******************************************************************************/

// screen variables
let screenWidth = 320;
let screenHeight = 208;
const GRIDSIZE = 8;

//player variables
let player;
let currentAniFrame;
let currentAnimation;

//friends' (NPC) variables
let friends; //variable for entire group (an array)
let juanita;
let dudes;
let ereth;
let phor;
let ceese;

//dialog box variables
let dialogueBox; //stores rectangle that makes up the dialogue box
let dialogueWidth = screenWidth - 20;
let dialogueHeight = screenHeight / 3;
let textPosX;
let textPosY;
let dialogueSwitch = false; //stores a boolean that decides if dialogue should be active or not.
let currentDialogue;
let currentSpeakerImage;
let currentSpeaker;
let portraitPosX;
let portraitPosY;

let juanitaPortrait;

//max player speed
let speed = 60;



/*****************************************************************************
                                  CONFIGURATION
******************************************************************************/
//phaser basic template/configuration
// indicates what phaser renderer to use , canvas width and height, and where to put it in the DOM
const config = {
  type: Phaser.AUTO,
  width: screenWidth,
  height: screenHeight,
  zoom: 3,
  pixelArt: true,
  parent: "game-container",
  scene: [GameScene,DialogueScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {y:0}
    }
  }
};

window.onload = function() {
  // game uses parameters set in config; instantiation of game
   const game = new Phaser.Game(config);
   game.scene.start('UIScene');
   game.scene.start('GameScene');

}


 /*****************************************************************************
                                     IMPORT
 ******************************************************************************/
 //import scenes into game



/*****************************************************************************
                                DIALOGUE
******************************************************************************/

let erethDialogue = [
    {"name":"fyve","text":"Hey Ereth. How're you feeling?"},
    {"name":"ereth", "text": "Okay, mostly."},
    {"name":"ereth", "text": "... Mm, nevermind, not true, I'm actually, 'worried, mostly'."},
    {"name":"fyve", "text": "Hah, yeah. Tell me about it."},
    {"name":"ereth", "text":"And scared, too. And sad. Fate really helped me come out of my shell, back when I first got here."},
    {"name":"fyve", "text":"Yeah, I remember. You never talked to anyone and spent so much time alone. We thought you were like, cool and aloof, but Fate saw right through you."},
    {"name":"ereth", "text": "And I'm so glad she did. Without her kindness, I wouldn't have gotten to know any of you, and I would never have been brave enough to ask Ceese out, or--"},
    {"name":"fyve", "text": "Wait, hold on, YOU asked Ceese out?"},
    {"name":"ereth", "text": "Um, yeah?"},
    {"name":"fyve", "text":"I always figured it was the other way around!! Damn, Ereth, I'm proud of you! Like, retroactively."},
    {"name":"ereth", "text": "Heehee, thanks. But it would’ve never happened without all of Fate’s pep talks."},
    {"name":"fyve", "text":"She sure was good at those, wasn't she?"},
    {"name":"ereth", "text": "Yes, she was."},
    {"name":"fyve", "text":"After talking to her, I felt like I could do anything. She always knew what to say."},
    {"name":"ereth", "text": "... Fyve, be careful, okay? Fate’s... not who she was before. I know you know that, but I also know that you still love her. We all do. So don’t let your guard down. She’s dangerous."},
    {"name":"fyve", "text": "Yeah... But if you think about it, hasn’t she always been?"},
    {"name":"ereth", "text": "Mm. Take care, Fyve."},
    {"name":"fyve", "text": "You too, kid."},
    {"name":"none", "text":"(obtained skull-shaped button.)"}
  ]

//so when dialogue is active i want the dialogue box to be there , on the bottom half of the screen
// portraits change depending on whos talking
//obviously dialogue changes as conversation goes

/*****************************************************************************
                                  SOURCES
******************************************************************************/

//font from: https://opengameart.org/content/good-neighbors-pixel-font-starlingunity-version-updated
