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

//friends' dialogue portraits
let juanitaPortrait;
let dudesPortrait;
let erethPortrait;
let phorPortrait;
let ceesePortrait;

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
                                DIALOGUE
******************************************************************************/

let juanitaDialogue = [
    {"name":"juanita","text":"Fyve..."},
    {"name":"juanita","text":"Fyve..."},
    {"name":"fyve", "text": "... yeah?"},
    {"name":"juanita", "text": "... I'm. Sorry. About everything."},
    {"name":"fyve", "text": "I know."},
    {"name":"fyve", "text":"You've only said it like, a million times."},
    {"name":"juanita", "text":"It doesn't make up for what I did."},
    {"name":"fyve", "text": "You're right. It doesn't."},
    {"name":"juanita", "text": "..."},
    {"name":"fyve", "text": "Y’know what’s funny? when I remembered who you really were, my first instinct was to be sad, about all the stuff I forgot about the good times we had together. The anger came after that."},
    {"name":"juanita", "text":"Are we... ever going to be okay again? Not just you and me, but the others, too."},
    {"name":"juanita", "text": "Dudes and Phor still won’t talk to me, and Ereth won’t even come near me. And Ceese-- I didn't even know she could get this mad. I can’t imagine things going back to normal after all of this is over."},
    {"name":"fyve", "text":"You erased our memories, Juani. That’s never going to be okay."},
    {"name":"fyve", "text": "But even though I'm really, really mad, I think I can still forgive you. And the others probably will too."},
    {"name":"fyve", "text":"Just. Give it time."},
    {"name":"juanita", "text": "..."},
    {"name":"juanita", "text": "Okay. ... Thank you."},
    {"name":"none", "text":"(obtained BFF necklace.)"},
    {"name":"none", "text":"(obtained BFF necklace.)"}
  ];

let dudesDialogue = [
    {"name":"dudes","text":"'sup Fyve?"},
    {"name":"dudes","text":"'sup Fyve?"},
    {"name":"fyve", "text": "Hi Dudes."},
    {"name":"dudes", "text": "You doin' okay?"},
    {"name":"fyve", "text": "Not bad, all things considered. A little nervous."},
    {"name":"dudes", "text":"Yeah, I don’t blame ya. But we gotta do what we gotta do, right?"},
    {"name":"fyve", "text":"Mm."},
    {"name":"dudes", "text": "..."},
    {"name":"dudes", "text": "Do you remember back when the gift shop first opened?"},
    {"name":"dudes", "text": "Like, back before it was even a thing?"},
    {"name":"fyve", "text":"Barely. Memory's still kinda foggy."},
    {"name":"dudes", "text": "Well, it was Fate's idea, y'know? To open the gift shop."},
    {"name":"fyve", "text":"Hahah, really?"},
    {"name":"dudes", "text": "It was back when stuff got real bad at home. Fate didn’t like seein’ me mope around. She gave me a purpose. "},
    {"name":"fyve", "text":"Hah. That’s just like her, isnt it?"},
    {"name":"dudes", "text": "Yeah. Classic Fate. Always stickin’ her antennae in other people's business."},
    {"name":"dudes", "text": "It really came back to bite her, huh? Ain't there a word for that? Hubris?"},
    {"name":"fyve", "text":"Yeah..."},
    {"name":"dudes", "text":"I feel real bad about taking her down. Even though she did some pretty awful stuff. ‘s that weird?"},
    {"name":"fyve", "text":"I don't think so. Can’t say I'm looking forward to what's about to go down, myself."},
    {"name":"dudes", "text":"… good luck, Fyve. Even if we could, I don't think any of us could handle seein’ her like this, ‘cept for you."},
    {"name":"none","text":"(obtained ID tag.)"},
    {"name":"none","text":"(obtained ID tag.)"}
  ];

let erethDialogue = [
    {"name":"fyve","text":"Hey Ereth. How're you feeling?"},
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
    {"name":"none", "text":"(obtained skull-shaped button.)"},
    {"name":"none", "text":"(obtained skull-shaped button.)"}
  ];

  let phorDialogue = [
    {"name":"phor","text":"Hey darling~ All psyched up and ready to punch a moth to save the world?"},
    {"name":"phor","text":"Hey darling~ All psyched up and ready to punch a moth to save the world?"},
    {"name":"fyve", "text": "... H-hah... Yeah, sure..."},
    {"name":"phor", "text": "Oh dear. Was that too soon?"},
    {"name":"fyve", "text": "Just a little."},
    {"name":"phor", "text":"Ohh, Fyve, love, I'm sorry. I just wanted to lighten the mood."},
    {"name":"fyve", "text":"I know, Phor, it’s okay. Better that than solemnly telling me that I’m going to die."},
    {"name":"phor", "text": "..."},
    {"name":"fyve", "text": "Phor?"},
    {"name":"phor", "text": "... do you think she'd do it?"},
    {"name":"fyve", "text":"Huh?"},
    {"name":"phor", "text": "Fate. Do you think she'd really kill you?"},
    {"name":"phor", "text":"After eight years of friendship?"},
    {"name":"phor", "text": "After all you two have been through together?"},
    {"name":"fyve", "text":"... I dunno, Phor. Fate's not the same person she was before everything went wrong. Even then, to become a deity is to lose your humanity, so honestly, I doubt she’ll even recognize me."},
    {"name":"phor", "text": "But if there's even a glimmer of possibility--"},
    {"name":"fyve", "text": "Yeah, of course."},
    {"name":"phor", "text": "Please, Fyve. Bring her home."},
    {"name":"fyve", "text": "... I'll try."},
    {"name":"none", "text":"(obtained wax candle.)"},
    {"name":"none", "text":"(obtained wax candle.)"}
  ];

  let ceeseDialogue = [
    {"name":"ceese","text":"Hey Fyve-er."},
    {"name":"ceese","text":"Hey Fyve-er."},
    {"name":"fyve", "text": "Hey Ceesaroni."},
    {"name":"ceese", "text": "C'mere. One last pic."},
    {"name":"none", "text": "(the shutter clicks, and Ceese takes a selfie of the two of you with her polaroid.)"},
    {"name":"fyve", "text":"A warning woulda been nice. If I die, this crappy picture is the last memory you'll have of me."},
    {"name":"ceese", "text":"You're not gonna die, Fyve. We all know you're gonna stop Fate from ruinin’ the world or whatever."},
    {"name":"fyve", "text": "Why the selfie then?"},
    {"name":"ceese", "text": "So we can look back on this awful day and laugh about it."},
    {"name":"fyve", "text": "That's... optimistic of you."},
    {"name":"ceese", "text":"I don't have much else to offer right now but optimism."},
    {"name":"fyve", "text": "Ceese..."},
    {"name":"ceese", "text":"Besides, when have I EVER warned someone of an impending selfie?"},
    {"name":"fyve", "text": "Fair point."},
    {"name":"ceese", "text":"G'luck Fyve. You got this."},
    {"name":"fyve", "text": "Thanks."},
    {"name":"ceese", "text": "See ya soon, okay?"},
    {"name":"fyve", "text": "For sure."},
    {"name":"none", "text":"(obtained group scrapbook.)"},
    {"name":"none", "text":"(obtained group scrapbook.)"}
  ];

//so when dialogue is active i want the dialogue box to be there , on the bottom half of the screen
// portraits change depending on whos talking
//obviously dialogue changes as conversation goes

/*****************************************************************************
                                  SOURCES
******************************************************************************/

//font from: https://opengameart.org/content/good-neighbors-pixel-font-starlingunity-version-updated
