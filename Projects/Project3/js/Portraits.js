//portrait class for the dialog boxes. base for all portraits

class Portrait extends Phaser.GameObjects.Image {
  constructor(scene,x,y,name) {
    super(scene,x,y);

    this.name = name;
    this.addPortrait();
    this.portrait.setScale(0.5);
    this.portrait.setVisible(false);
  }

  addPortrait() {
    if (this.name == "juanita") {
      this.portrait = this.scene.add.image(this.x,this.y,'juanitaPortrait');
    } else if (this.name == "dudes") {
      this.portrait = this.scene.add.image(this.x,this.y,'dudesPortrait');
    } else if (this.name == "ereth") {
      this.portrait = this.scene.add.image(this.x,this.y,'erethPortrait');
    } else if (this.name == "phor") {
      this.portrait = this.scene.add.image(this.x,this.y,'phorPortrait');
    } else if (this.name == "ceese") {
      this.portrait = this.scene.add.image(this.x,this.y,'ceesePortrait');
    }
  }

  //display portrait based on which character is speaking
  displayPortrait() {
    this.setSpeakerImage();
    if (currentSpeaker == this.name) {
        this.portrait.setVisible(true);
        fyvePortrait.setVisible(false);
      } else if (currentSpeaker == "fyve"){
          this.portrait.setVisible(false)
          fyvePortrait.setVisible(true);
        }
  }

  //detects which character is speaking
  setSpeakerImage() {
      if (dialogueSwitch == true && Phaser.Input.Keyboard.JustDown(this.scene.cursors.space)) {
        console.log(currentSpeaker);
        if (currentSpeaker == this.name) {
          currentSpeakerImage = this.portrait;
        }
      }
    }
  }
