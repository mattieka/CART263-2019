class Friend extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, portrait,state,name) {
    super(scene,x,y,texture,frame);
    this.portrait = portrait;
    this.state = state;
    this.name = name;

    scene.add.existing(this);
  }

  addAnimation() {
    //juanita idle
    if (this.name == "juanita") {
      this.scene.anims.create({
        key: "juanita",
        frames: this.scene.anims.generateFrameNumbers("juaniIdle", {start:0,end:5}),
        frameRate: 8,
        repeat: -1
      });
    }
  }

  initializeState() {
    this.setState(state);
  }

  checkCollision() {
    if (player.body.hitTest(this.sprite.x,this.sprite.y+8) && this.cursors.space.isDown && this.state=="dialogueIsInactive" && dialogueSwitch == false) {
      dialogueSwitch = true;
      this.setState("dialogIsActive");
      console.log(this.state);
      currentSpeaker = this;
    }
  }


}
