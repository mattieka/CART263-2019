"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/


/*****************************************************************************
                                  CONFIGURATION
******************************************************************************/

let screenWidth = 200;
let screenHeight = 150;

//phaser basic template/configuration
// indicates what phaser renderer to use , canvas width and height, and where to put it in the DOM
const config = {
  type: Phaser.AUTO,
  width: screenWidth,
  height: screenHeight,
  zoom: 4,
  pixelArt: true,
  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {y:0}
    }
  }
};


/*****************************************************************************
                                  VARIABLES
******************************************************************************/

// game uses parameters set in config
const game = new Phaser.Game(config);


const GRIDSIZE = 8;
//player variable

let player;
let currentAniFrame;
let currentAnimation;

//friends' (NPC) variables
let friends;
let juanita;
let dudes;
let ereth;
let phor;
let ceese;

//max player speed
let speed = 60;

/*****************************************************************************
                                  PRELOAD
******************************************************************************/

//runs once, to load assets (images, audio, etc)
function preload() {
//load tiles (png sheets)
  this.load.image("indoorTiles", "assets/images/indoorTiles.png");
  this.load.image("cityTiles", "assets/images/cityTiles.png");
  this.load.tilemapTiledJSON("mainMap","assets/tilemaps/mainMap.json");

//load objects (png spritesheets)
  this.load.spritesheet("darkness","assets/sprites/interactives/darkness.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("elevatorDoor","assets/sprites/interactives/elevatorDoor.png",{frameWidth:32,frameHeight:32});
  this.load.spritesheet("panel","assets/sprites/interactives/panel.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("piano","assets/sprites/interactives/piano.png",{frameWidth:32,frameHeight:16});
  this.load.spritesheet("singleTileInteractables","assets/sprites/interactives/singleTileInteractables.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("stove","assets/sprites/interactives/stove.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("trash","assets/sprites/interactives/trash.png",{frameWidth:16,frameHeight:16});

  //load player sprites
  this.load.spritesheet("fyveDown","assets/sprites/fyve/down/fyveDownSheet.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("fyveUp","assets/sprites/fyve/up/fyveUpSheet.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("fyveLeft","assets/sprites/fyve/left/fyveLeftSheet.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("fyveRight","assets/sprites/fyve/right/fyveRightSheet.png",{frameWidth:16,frameHeight:16});
  //this.load.spritesheet("cityTilesSprite", "assets/images/cityTiles.png", {frameWidth:16,frameHeight:16});

  //load npc sprites
  this.load.spritesheet("juaniIdle","assets/sprites/friends/juaniIdle.png", {frameWidth:16, frameHeight:16});
  this.load.spritesheet("dudesIdle","assets/sprites/friends/dudesIdle.png",{frameWidth:32,frameHeight:32});
  this.load.spritesheet("erethIdle","assets/sprites/friends/erethIdle.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("phorIdle","assets/sprites/friends/zephoryaIdle.png", {frameWidth:16, frameHeight:32});
  this.load.spritesheet("ceeseIdle","assets/sprites/friends/ceeseIdle.png",{frameWidth:16,frameHeight:16});
}

/*****************************************************************************
                                  CREATE
******************************************************************************/

//runs once after assets are loaded
function create() {
  //MAP STUFF
  // constant to store map
  const mainMap = this.make.tilemap({key: "mainMap"});

  // constants for tilesets
  const indoorTileset = mainMap.addTilesetImage("indoorTiles","indoorTiles");
  const cityTileset = mainMap.addTilesetImage("cityTiles", "cityTiles");

  // info about layers in tiled
  const floor = mainMap.createStaticLayer("floor", cityTileset,0 ,0);
  const walls = mainMap.createStaticLayer("walls", cityTileset,0,0);
  const belowPlayer = mainMap.createStaticLayer("belowPlayer",indoorTileset,0,0);
  const abovePlayer = mainMap.createStaticLayer("abovePlayer",indoorTileset,0,0);


  //object layers from tiled
  let elevatorPanel = mainMap.createFromObjects("elevatorPanel", 1525, { key: 'panel' } );
  let doorDarkness = mainMap.createFromObjects("doorDarkness", 1523, { key: 'darkness' } );
  let elevatorDoor = mainMap.createFromObjects("doors", 1524, { key: 'elevatorDoor' } );
  let paintings = mainMap.createFromObjects("paintings", 'smallBlue', { key: 'singleTileInteractables' ,frame: 9} );
  let plants = mainMap.createFromObjects("plants", 1547, { key: 'singleTileInteractables',frame: (1) }  );
  let bed = mainMap.createFromObjects("bed", 1535, { key: 'singleTileInteractables', frame: 8} );
  let bucket = mainMap.createFromObjects("bucket", 1544, { key: 'singleTileInteractables', frame: 17 } );
  let piano = mainMap.createFromObjects("piano", 1526, { key: 'piano' } );

  //PLAYER STUFF
  // set player starting position and have it obey game's physics
  player = this.physics.add.sprite(72,72,"fyveDown");

  //NPCS/FRIENDS
  //set npc locations
  juanita = this.physics.add.sprite(296,120,"juaniIdle");
  dudes = this.physics.add.sprite(64,160,"dudesIdle");
  ereth = this.physics.add.sprite(40,56,"erethIdle");
  phor = this.physics.add.sprite(264,192,"phorIdle");
  ceese = this.physics.add.sprite(176,56,"ceeseIdle");

  //juanita idle
  this.anims.create({
    key: "juanita",
    frames: this.anims.generateFrameNumbers("juaniIdle", {start:0,end:5}),
    frameRate: 8,
    repeat: -1
  });

  //dudes idle
  this.anims.create({
    key:"dudes",
    frames:this.anims.generateFrameNumbers("dudesIdle",{start:0,end:7}),
    frameRate:5,
    repeat:-1
  });

  //ereth idle
  this.anims.create({
    key:"ereth",
    frames:this.anims.generateFrameNumbers("erethIdle",{start:0,end:7}),
    frameRate:5,
    repeat:-1
  });

  //phor idle
  this.anims.create({
    key:"phor",
    frames:this.anims.generateFrameNumbers("phorIdle",{start:0,end:10}),
    frameRate: 3,
    repeat:-1
  });

  this.anims.create({
    key:"ceese",
    frames:this.anims.generateFrameNumbers("ceeseIdle",{start:0,end:7}),
    frameRate: 7,
    repeat:-1
  });

  //grouping
  friends = this.physics.add.group({
    immovable:true
  });
  friends.addMultiple([juanita,dudes,ereth,phor,ceese]);

  console.log(friends);

  //ANIMATIONS
  //walking DOWN
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers("fyveDown",{start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
  });

  //walking UP
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers("fyveUp",{ start: 0, end: 3}),
    frameRate: 10,
    repeat:-1
  });

  //walking LEFT
  this.anims.create({
    key: 'left',
    frames:this.anims.generateFrameNumbers("fyveLeft",{start:0, end:3}),
    frameRate: 10,
    repeat:-1
  });

  //walking RIGHT
  this.anims.create({
    key: 'right',
    frames:this.anims.generateFrameNumbers("fyveRight",{start:0, end:3}),
    frameRate: 10,
    repeat:-1
  });


  // camera follow player
  this.cameras.main.setSize(screenWidth,screenHeight);
  this.cameras.main.startFollow(player);

  // register arrow keys for controlling character
  this.cursors = this.input.keyboard.createCursorKeys();

  // check for collisions
  this.physics.add.collider(player,friends);
  this.physics.add.collider(player,walls);
  walls.setCollisionByProperty({solid:true});

  // debug stuff
  // checking that correct tiles are colliding
  // @MATTIE COMMENT OUT WHEN NOT CHECKING
  // const debugGraphics = this.add.graphics().setAlpha(0.75);
  // walls.renderDebug(debugGraphics, {
  //   tileColor: null,
  //   collidingTileColor: new Phaser.Display.Color(243,134,48,255),
  //   faceColor: new Phaser.Display.Color(40,39,37,255)
  // });
}

/*****************************************************************************
                                  UPDATE
******************************************************************************/
//runs once per frame while the scene is active
function update(time, delta) {

  //stops previous movement in the last frame
  player.body.setVelocity(0);

  //vertical movement
  if (this.cursors.up.isDown) {
    player.body.setVelocityY(-speed);
    player.anims.play('up',true);
    //disable horizontal movment and snap to nearest grid line horizontally
    player.body.setVelocityX(0);
    player.x = Math.round(player.x/GRIDSIZE) * GRIDSIZE;

  } else if (this.cursors.down.isDown) {
    player.body.setVelocityY(speed);
    player.anims.play('down',true);
    //disable horizontal movment and snap to nearest grid line horizontally
    player.body.setVelocityX(0);
    player.x = Math.round(player.x/GRIDSIZE) * GRIDSIZE;
  }

  //horizontal movement
  if (this.cursors.left.isDown) {
    player.body.setVelocityX(-speed);
    player.anims.play('left',true);
    //disable vertical movement and snap to nearest grid line vertically
    player.body.setVelocityY(0);
    player.y = Math.round(player.y/GRIDSIZE) * GRIDSIZE;

  } else if (this.cursors.right.isDown) {
    player.body.setVelocityX(speed);
    player.anims.play('right',true);
    //disable vertical movement and snap to nearest grid line vertically
    player.body.setVelocityY(0);
    player.y = Math.round(player.y/GRIDSIZE) * GRIDSIZE;
  }

  //all keys released
  if (this.cursors.up.isUp && this.cursors.down.isUp && this.cursors.left.isUp && this.cursors.right.isUp) {
      //snap to grid when stopped
      player.x = Math.round(player.x/GRIDSIZE) * GRIDSIZE;
      player.y = Math.round(player.y/GRIDSIZE) * GRIDSIZE;

      //stop animations when not moving
      player.anims.stop();
      currentAnimation = player.anims.currentAnim;
      //if there is an animation active, find its current frame.
      //if that current frame is 2 or 4, push it back one frame so that the animation isnt mid-step
      if (currentAnimation != null) {
        currentAniFrame = player.anims.currentFrame.index;
        if (currentAniFrame == 2 || currentAniFrame == 4) {
          console.log(currentAniFrame);
          player.anims.previousFrame()
        }
      }
    }

  //keep idle animations going
  juanita.anims.play('juanita',true);
  dudes.anims.play('dudes',true);
  ereth.anims.play('ereth',true);
  phor.anims.play('phor',true);
  ceese.anims.play('ceese',true);

  this.physics.world.collide(player,friends);
  //keep player from moving super fast diagonally
  player.body.velocity.normalize().scale(speed);

}

/*****************************************************************************
                                  GRID
******************************************************************************/
