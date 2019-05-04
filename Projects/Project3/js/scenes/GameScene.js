class GameScene extends Phaser.Scene {

  constructor (config) {
    super('GameScene');
  }
  /*****************************************************************************
                                    PRELOAD
  ******************************************************************************/

  //runs once, to load assets (images, audio, etc)
  preload() {
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
  create() {
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

    //PLAYER STUFF
    // set player starting position and have it obey game's physics
    player = this.physics.add.sprite(72,72,"fyveDown");


    //NPCS/FRIENDS


    //set npc locations
    juanita = new Friend(this,296,120,"juaniIdle",0,"dialogueIsInactive","juanita",8,juanitaDialogue,0);
    dudes = new Friend (this,64,160,"dudesIdle",0,"dialogueIsInactive","dudes",16,dudesDialogue,0);
    ereth = new Friend (this,40,56,"erethIdle",0,"dialogueIsInactive","ereth",8,erethDialogue,0);
    phor = new Friend (this,264,192,"phorIdle",0,"dialogueIsInactive","phor",16,phorDialogue,0);
    ceese = new Friend (this,176,56,"ceeseIdle",0,"dialogueIsInactive","ceese",8,ceeseDialogue,0);

    //add all friends to a phaser group also called friends
    friends = this.physics.add.group({
      immovable:true //can't be pushed around by the player
    });

    friends.addMultiple([juanita,dudes,ereth,phor,ceese]);
    console.log(friends);

    //add friends' animation from custom class
    juanita.addAnimation();
    dudes.addAnimation();
    ereth.addAnimation();
    phor.addAnimation();
    ceese.addAnimation();

    //ANIMATIONS (PLAYER)
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
    this.physics.add.collider(player,abovePlayer);
    this.physics.add.collider(player,belowPlayer);
    walls.setCollisionByProperty({solid:true});
    abovePlayer.setCollisionByProperty({solid:true});
    belowPlayer.setCollisionByProperty({solid:true});

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
  update(time, delta) {

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

    //check for player-friend collisions
    juanita.checkCollision();
    dudes.checkCollision();
    ereth.checkCollision();
    phor.checkCollision();
    ceese.checkCollision();

    //show dialogue text
    juanita.showDialogue();
    dudes.showDialogue();
    ereth.showDialogue();
    phor.showDialogue();
    ceese.showDialogue();

    if (dialogueSwitch == true) {
      player.anims.play('up',true);
      player.body.setVelocityX(0);
      player.body.setVelocityY(0);
      player.anims.stop();
    }

    //check collisions between player and friends
    this.physics.world.collide(player,friends);

  }
}
