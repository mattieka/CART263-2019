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
    dialogueBox.setVisible(false);

    currentDialogue = this.add.bitmapText(textPosX,textPosY,'font','asdfd');
    currentDialogue.setVisible(false);



  }

  update() {
    if (dialogueSwitch == true) {
      currentDialogue.setText(erethDialogue[0].text);
      dialogueBox.setVisible(true);
      currentDialogue.setVisible(true);

      //checks speaker
      if (erethDialogue[0].name == 'ereth') {
        currentSpeaker = ereth;
        console.log(currentSpeaker);
      }
    }
  }
}
