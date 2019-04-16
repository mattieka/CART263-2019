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

//phaser basic template/configuration
// indicates what phaser renderer to use , canvas width and height, and where to put it in the DOM
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  zoom: 3,
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
      gravity: {y:0}
    }
  }
};


/*****************************************************************************
                                  VARIABLES
******************************************************************************/

// game uses parameters set in config
const game = new Phaser.Game(config);

//player variable

let player;


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
  this.load.tilemapTiledJSON("testMap","assets/tilemaps/actualtestmap.json");

  //load player sprites
  this.load.spritesheet("fyveDown","assets/sprites/fyve/down/fyveDownSheet.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("fyveUp","assets/sprites/fyve/up/fyveUpSheet.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("fyveLeft","assets/sprites/fyve/left/fyveLeftSheet.png",{frameWidth:16,frameHeight:16});
  this.load.spritesheet("fyveRight","assets/sprites/fyve/right/fyveRightSheet.png",{frameWidth:16,frameHeight:16});
}

/*****************************************************************************
                                  CREATE
******************************************************************************/

//runs once after assets are loaded
function create() {
  //MAP STUFF
  // constant to store map
  const testMap = this.make.tilemap({key: "testMap"});

  // constants for tilesets
  const indoorTileset = testMap.addTilesetImage("inside","indoorTiles");
  const cityTileset = testMap.addTilesetImage("outside", "cityTiles");

  // info about layers in tiled
  const background = testMap.createStaticLayer("background", cityTileset,0 ,0);
  const blockedTiles = testMap.createStaticLayer("blockedTiles", cityTileset,0,0);
  blockedTiles.setCollisionByProperty({collides:true});

  const objectsLayer = testMap.createFromObjects("objectsLayer", "items", {key: 'Type'});


  //PLAYER STUFF
  // set player starting position and have it obey game's physics
  player = this.physics.add.sprite(50,70,"fyveDown");

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

  // register arrow keys for controlling character
  this.cursors = this.input.keyboard.createCursorKeys();

  // check for collisions
  this.physics.add.collider(player,blockedTiles);

  //debug stuff
  //checking that correct tiles are colliding
  //@MATTIE COMMENT OUT WHEN NOT CHECKING
  // const debugGraphics = this.add.graphics().setAlpha(0.75);
  // blockedTiles.renderDebug(debugGraphics, {
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

  //stop animation when not moving
  if (this.cursors.up.isUp && this.cursors.down.isUp && this.cursors.left.isUp && this.cursors.right.isUp) {
    player.anims.stop();
  }

  //vertical movement
  if (this.cursors.up.isDown) {
    player.body.setVelocityY(-speed);
    player.anims.play('up',true);
  } else if (this.cursors.down.isDown) {
    player.body.setVelocityY(speed);
    player.anims.play('down',true);
  }

  //horizontal movement
  if (this.cursors.left.isDown) {
    player.body.setVelocityX(-speed);
    player.anims.play('left',true);
  } else if (this.cursors.right.isDown) {
    player.body.setVelocityX(speed);
    player.anims.play('right',true);
  }

  //keep player from moving super fast diagonally
  player.body.velocity.normalize().scale(speed);

}
