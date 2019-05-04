//friend class. base for all npcs.

class Friend extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame,state,name,collisionOffset,dialogueArray,dialogueIndex) {
    super(scene,x,y,texture,frame);
    this.state = state;
    this.name = name;
    this.collisionOffset = collisionOffset;
    this.dialogueArray = dialogueArray;
    this.dialogueIndex = dialogueIndex;

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
    } else if (this.name == "dudes") {
      //dudes idle
      this.scene.anims.create({
        key:"dudes",
        frames:this.scene.anims.generateFrameNumbers("dudesIdle",{start:0,end:7}),
        frameRate:5,
        repeat:-1
      });
    } else if (this.name=="ereth") {
      //ereth idle
      this.scene.anims.create({
        key:"ereth",
        frames:this.scene.anims.generateFrameNumbers("erethIdle",{start:0,end:7}),
        frameRate:5,
        repeat:-1
      });
    } else if (this.name=="phor") {
      //phor idle
      this.scene.anims.create({
        key:"phor",
        frames:this.scene.anims.generateFrameNumbers("phorIdle",{start:0,end:10}),
        frameRate: 3,
        repeat:-1
      });
    } else if (this.name =="ceese") {
      //ceese idle
      this.scene.anims.create({
        key:"ceese",
        frames:this.scene.anims.generateFrameNumbers("ceeseIdle",{start:0,end:7}),
        frameRate: 7,
        repeat:-1
      });
    }

  }

  //on collision, dialogue state is active.
  checkCollision() {
    if (player.body.hitTest(this.x,this.y+this.collisionOffset) && this.scene.cursors.space.isDown && this.state=="dialogueIsInactive" && dialogueSwitch == false) {
      this.setState("dialogueIsActive");
      console.log(this.state);
      dialogueSwitch = true;
    }
  }

  //shows dialogue based on who is speaking
  showDialogue() {

    if (friendsSpokenWith >= 5) {
      $("#ending").show();
      $("#ending").dialog({
       dialogClass: "no-close",
       buttons: [
       {
         text: "Restart",
         click: function() {
           $( this ).dialog( "close" );
           window.location.reload(true);
           friendsSpokenWith = 0;
         }
       }
      ]
      });
    }

    if (dialogueSwitch == true && this.state == "dialogueIsActive" && this.dialogueIndex < this.dialogueArray.length-1) {
      currentSpeaker = this.dialogueArray[this.dialogueIndex].name;
      console.log(currentSpeaker);
      currentDialogue.setText(this.dialogueArray[this.dialogueIndex].text);

      if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.space) && this.dialogueIndex <= this.dialogueArray.length-1) {
        this.dialogueIndex = this.dialogueIndex + 1;
        console.log(this.dialogueIndex);
      }

      if (this.dialogueIndex >= this.dialogueArray.length-1) {
        this.setState("dialogueDone");
        friendsSpokenWith = friendsSpokenWith +1;
        dialogueSwitch = false;
      }
    }
  }
}
