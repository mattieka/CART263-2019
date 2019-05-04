"use strict";

/*****************

Deity's Domain Exerpt
by Mattie

Walk around and talk to NPCs.
Purpose was for me to learn to use Phaser.

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

//max player speed
let speed = 160;

//friends' (NPC) variables
let friends; //variable for entire group (an array)
let juanita;
let dudes;
let ereth;
let phor;
let ceese;

//friends' + player's dialogue portraits
let juanitaPortrait;
let dudesPortrait;
let erethPortrait;
let phorPortrait;
let fyvePortrait;
let ceesePortrait;

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
let portraitWidth = 64;
let portraitHeight = 64;

let friendsSpokenWith = 0;



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
  $("#ending").hide();
  // game uses parameters set in config; instantiation of game
  // pop up alert with instructions.
   $("#alert").dialog({
    dialogClass: "no-close",
    buttons: [
    {
      text: "Start Game",
      click: function() {
        $( this ).dialog( "close" );
        const game = new Phaser.Game(config);
        game.scene.start('UIScene');
        game.scene.start('GameScene');
        }
      }
    ]
  });
}


/*****************************************************************************
                                DIALOGUE
******************************************************************************/

let juanitaDialogue = [
    {"name":"juanita","text":"Fyve..."},
    {"name":"juanita","text":"Fyve..."},
    {"name":"fyve", "text": "... yeah?"},
    {"name":"juanita", "text": "... I'm. Sorry. \nAbout everything."},
    {"name":"fyve", "text": "I know."},
    {"name":"fyve", "text":"You've only said it like, \na million times."},
    {"name":"juanita", "text":"It doesn't make up for what I did."},
    {"name":"fyve", "text": "You're right. It doesn't."},
    {"name":"juanita", "text": "..."},
    {"name":"fyve", "text": "Y’know what’s funny? when I \nremembered who you really were, \nmy first instinct was to be sad."},
    {"name":"fyve","text":"Sad about all the stuff I forgot \nabout the good times we had \ntogether. The anger came after \nthat."} ,
    {"name":"juanita", "text":"Are we... ever going to be \nokay again? Not just you and me, \nbut the others, too."},
    {"name":"juanita", "text": "Dudes and Phor still won’t talk to \nme, and Ereth won’t even come near \nme. And Ceese- I didn't even know \nshe could get this mad."},
    {"name":"juanita", "text":"I can’t imagine things going back to \nnormal after all of this is over."},
    {"name":"fyve", "text":"You erased our memories, Juani. \nThat’s never going to be okay."},
    {"name":"fyve", "text": "But even though I'm really, really \nmad, I think I can still forgive you. \nAnd the others probably will too."},
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
    {"name":"fyve", "text": "Not bad, all things considered. \nA little nervous."},
    {"name":"dudes", "text":"Yeah, I don’t blame ya. But we gotta \ndo what we gotta do, right?"},
    {"name":"fyve", "text":"Mm."},
    {"name":"dudes", "text": "..."},
    {"name":"dudes", "text": "Do you remember back when the \ngift shop first opened?"},
    {"name":"dudes", "text": "Like, back before it was even \na thing?"},
    {"name":"fyve", "text":"Barely. \nMemory's still kinda foggy."},
    {"name":"dudes", "text": "Well, it was Fate's idea, y'know? \nTo open the gift shop."},
    {"name":"fyve", "text":"Hahah, really?"},
    {"name":"dudes", "text": "It was back when stuff got real bad \nat home. Fate didn’t like seein’ me \nmope around. She gave me a purpose. "},
    {"name":"fyve", "text":"Hah. \nThat’s just like her, isnt it?"},
    {"name":"dudes", "text": "Yeah. Classic Fate. Always stickin’ \nher antennae in other people's \nbusiness."},
    {"name":"dudes", "text": "It really came back to bite her, \nhuh? Ain't there a word for that? \nHubris?"},
    {"name":"fyve", "text":"Yeah..."},
    {"name":"dudes", "text":"I feel real bad about taking \nher down. Even though she did \nsome pretty awful stuff. \n‘s that weird?"},
    {"name":"fyve", "text":"I don't think so. Can’t say I'm \nlooking forward to what's about \nto go down, myself."},
    {"name":"dudes", "text":"...good luck, Fyve. Even if we could,\n I don't think any of us \ncould handle seein’ her like this, \n‘cept for you."},
    {"name":"none","text":"(obtained ID tag.)"},
    {"name":"none","text":"(obtained ID tag.)"}
  ];

let erethDialogue = [
    {"name":"fyve","text":"Hey Ereth. How're you feeling?"},
    {"name":"fyve","text":"Hey Ereth. How're you feeling?"},
    {"name":"ereth", "text": "Okay, mostly."},
    {"name":"ereth", "text": "... Mm, nevermind, not true, \nI'm actually, 'worried, mostly'."},
    {"name":"fyve", "text": "Hah, yeah. Tell me about it."},
    {"name":"ereth", "text":"And scared, too. And sad. Fate \nreally helped me come out of my \nshell, back when I first got here."},
    {"name":"fyve", "text":"Yeah, I remember. You never \ntalked to anyone and spent so much \ntime alone."},
    {"name":"fyve", "text":"We thought you were like, \ncool and aloof, but Fate saw right \nthrough you."},
    {"name":"ereth", "text": "And I'm so glad she did. \nWithout her kindness, I wouldn't \nhave gotten to know any of you,"},
    {"name":"ereth","text":"and I would never have been \nbrave enough to ask Ceese out, or-" },
    {"name":"fyve", "text": "Wait, hold on, YOU asked Ceese out?"},
    {"name":"ereth", "text": "Um, yeah?"},
    {"name":"fyve", "text":"I always figured it was the \nother way around!! Damn, Ereth, \nI'm proud of you! \nLike, retroactively."},
    {"name":"ereth", "text": "Heehee, thanks. But it would’ve \nnever happened without all of \nFate’s pep talks."},
    {"name":"fyve", "text":"She sure was good at those, \nwasn't she?"},
    {"name":"ereth", "text": "Yes, she was."},
    {"name":"fyve", "text":"After talking to her, \nI felt like I could do anything. \nShe always knew what to say."},
    {"name":"ereth", "text": "... Fyve, be careful, okay? \nFate’s... not who she was before."},
    {"name":"ereth","text": "I know you know that, but I also \nknow that you still love her. \nWe all do. So don’t let your guard down. She’s dangerous."},
    {"name":"fyve", "text": "Yeah... But if you think about it, \nhasn’t she always been?"},
    {"name":"ereth", "text": "Mm. Take care, Fyve."},
    {"name":"fyve", "text": "You too, kid."},
    {"name":"none", "text":"(obtained skull-shaped button.)"},
    {"name":"none", "text":"(obtained skull-shaped button.)"}
  ];

  let phorDialogue = [
    {"name":"phor","text":"Hey darling~ All psyched up and ready to punch a moth to save the world?"},
    {"name":"phor","text":"Hey darling<3 \nAll psyched up and ready to punch \na moth to save the world?"},
    {"name":"fyve", "text": "... H-hah... Yeah, sure..."},
    {"name":"phor", "text": "Oh dear. Was that too soon?"},
    {"name":"fyve", "text": "Just a little."},
    {"name":"phor", "text":"Ohh, Fyve, love, I'm sorry. \nI just wanted to lighten the mood."},
    {"name":"fyve", "text":"I know, Phor, it’s okay. \nBetter that than solemnly telling \nme that I’m going to die."},
    {"name":"phor", "text": "..."},
    {"name":"fyve", "text": "Phor?"},
    {"name":"phor", "text": "... do you think she'd do it?"},
    {"name":"fyve", "text":"Huh?"},
    {"name":"phor", "text": "Fate. Do you think she'd really \nkill you?"},
    {"name":"phor", "text":"After eight years of friendship?"},
    {"name":"phor", "text": "After all you two have been through \ntogether?"},
    {"name":"fyve", "text":"... I dunno, Phor. \nFate's not the same person she was \nbefore everything went wrong."},
    {"name":"fyve", "text":"Even then, to become a deity is to \nlose your humanity, so honestly, \nI doubt she will even recognize me."},
    {"name":"phor", "text": "But if there's even a glimmer of \npossibility--"},
    {"name":"fyve", "text": "Yeah, of course."},
    {"name":"phor", "text": "Please, Fyve. \nBring her home."},
    {"name":"fyve", "text": "... I'll try."},
    {"name":"none", "text":"(obtained wax candle.)"},
    {"name":"none", "text":"(obtained wax candle.)"}
  ];

  let ceeseDialogue = [
    {"name":"ceese","text":"Hey Fyve-er."},
    {"name":"ceese","text":"Hey Fyve-er."},
    {"name":"fyve", "text": "Hey Ceesaroni."},
    {"name":"ceese", "text": "C'mere. One last pic."},
    {"name":"none", "text": "(the shutter clicks, and Ceese \ntakes a selfie of the two of you \nwith her polaroid.)"},
    {"name":"fyve", "text":"A warning woulda been nice. \nIf I die, this crappy picture is the \nlast memory you'll have of me."},
    {"name":"ceese", "text":"You're not gonna die, Fyve. \nWe all know you're gonna stop Fate \nfrom ruinin’ the world or whatever."},
    {"name":"fyve", "text": "Why the selfie then?"},
    {"name":"ceese", "text": "So we can look back on this awful \nday and laugh about it."},
    {"name":"fyve", "text": "That's... optimistic of you."},
    {"name":"ceese", "text":"I don't have much else to offer \nright now but optimism."},
    {"name":"fyve", "text": "Ceese..."},
    {"name":"ceese", "text":"Besides, when have I EVER warned \nsomeone of an impending selfie?"},
    {"name":"fyve", "text": "Fair point."},
    {"name":"ceese", "text":"G'luck Fyve. You got this."},
    {"name":"fyve", "text": "Thanks."},
    {"name":"ceese", "text": "See ya soon, okay?"},
    {"name":"fyve", "text": "For sure."},
    {"name":"none", "text":"(obtained group scrapbook.)"},
    {"name":"none", "text":"(obtained group scrapbook.)"}
  ];


/*****************************************************************************
                                  SOURCES
******************************************************************************/

//font from: https://opengameart.org/content/good-neighbors-pixel-font-starlingunity-version-updated
