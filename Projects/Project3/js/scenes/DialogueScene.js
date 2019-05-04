class DialogueScene extends Phaser.Scene {

  constructor(config){
    super('UIScene');
  }

  preload() {
    this.load.bitmapFont('font','assets/font/goodNeighbor.png','assets/font/goodNeighbor.xml');
  }

  create() {
    textPosX = 64;
    textPosY = screenHeight-dialogueHeight-10

    dialogueBox = this.add.rectangle(screenWidth/2, screenHeight-dialogueHeight/2-10,dialogueWidth,dialogueHeight,0x333135)
    currentDialogue = this.add.bitmapText(textPosX,textPosY,'font','asdfd');
  }

  update() {
    if (dialogueSwitch == true) {
      dialogueBox.setVisible(true);
      currentDialogue.setVisible(true);
    }

    if (dialogueSwitch == false) {
      currentDialogue.setVisible(false);
      dialogueBox.setVisible(false);
    }
  }
}
