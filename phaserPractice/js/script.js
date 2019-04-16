/****************************************************************************
                                  CONFIG
*****************************************************************************/
// set up basic game parameters like width, height, physics, and scenes (states)
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 300},
      debug: false
    }
  },

  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

/****************************************************************************
                                  VARIABLES
*****************************************************************************/

let game = new Phaser.Game(config);
let platforms;
let player;

/****************************************************************************
                                  PRELOAD
*****************************************************************************/
//preload is useful for bringing in assets that will be needed in the game.
//main commands are:
// - this.load.image('name of image', 'image path');
// - this.load.spritesheet('name of spritesheet',
//      'spritesheet path', {
//       frameWidth: w/e number, frameHeight: w/e number
//    });
//NOTE: the "name" that you give the image is just a string that you can reuse later
//it doesnt have to be the file name

function preload() {
  this.load.image('sky','/assets/sky.png');
  this.load.image('ground','assets/platform.png');
  this.load.image('star',"assets/star.png");
  this.load.image('bomb','assets/bomb.png');
  this.load.spritesheet('dude','assets/dude.png',{frameWidth:32,frameHeight:48});
}

/****************************************************************************
                                  CREATE
*****************************************************************************/
// from what i understand this is essentially a watered down version of unity's start function
// to show an image:
//      this.add.image('x-coord','y-coord','name of image');
// optionally, change the origin by tacking on .setOrigin(x,y);

//things are drawn from top to bottom, with the most recently added drawn on top.

function create() {
  //by default phaser places an image from the center
  //get around this by resetting the origin
  //ALSO! you can get the width and height of the game screen
  // by using the config variable like with width/height in p5
  this.add.image(0,0,'sky').setOrigin(0,0);
  this.add.image(config.width/2,config.height/2,'star');

  //static group means that whatever is in this group is untouched by physics
  //and wont move no matter what (as opposed to the dynamic group)
  //because theyre a group you can change stuff about them all at once
  //essentially they're parented?? kinda???
  platforms = this.physics.add.staticGroup();

  //individually create each platform I GUESS I"LL DIE please god let there be a faster way lmao
  //refresh body is there to reload the physics on that platform since we've forced it to scale
  //up even though statics are supposed to be unchangeable
  platforms.create(400,568,'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  //PLAYER STUFF//

  //adding the player via physics makes it adhere to physics by default (dynamic body)
  player = this.physics.add.sprite(100,450,'dude');

  // he bnounce
  player.setBounce(0.2);

  // cant leave screen
  player.setCollideWorldBounds(true);

  //animations
  //repeat value of -1 makes the animations loop. the rest is fairly self explanatory
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude',{start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });


}

/****************************************************************************
                                  UPDATE
*****************************************************************************/


function update ()
{
}
