class DialogueScene extends Phaser.Scene {

  constructor(config){
    super('UIScene');
  }

  preload() {
    this.load.bitmapFont('font','assets/font/goodNeighbor.png','assets/font/goodNeighbor.xml');
    //load npc portraits
    this.load.image("juanitaPortrait","assets/sprites/portraits/juanitaPortrait.png");
    this.load.image("dudesPortrait","assets/sprites/portraits/dudesPortrait.png");
    this.load.image("erethPortrait","assets/sprites/portraits/erethPortrait.png");
    this.load.image("phorPortrait","assets/sprites/portraits/phorPortrait.png");
    this.load.image("fyvePortrait","assets/sprites/portraits/fyvePortrait.png");
    this.load.image("ceesePortrait","assets/sprites/portraits/ceesePortrait.png");
  }

  create() {
    // register space for moving through dialogue
    this.cursors = this.input.keyboard.createCursorKeys();


    textPosX = portraitWidth + 20;
    textPosY = screenHeight-dialogueHeight-10;

    dialogueBox = this.add.rectangle(screenWidth/2, screenHeight-dialogueHeight/2-10,dialogueWidth,dialogueHeight,0x333135)
    currentDialogue = this.add.bitmapText(textPosX,textPosY,'font','asdfd');

    portraitPosX = textPosX - portraitWidth/2 - 5;
    portraitPosY = screenHeight-dialogueHeight/2-10;

    currentSpeakerImage = this.add.rectangle(portraitPosX,portraitPosY,64,64,0x333190)
    currentSpeakerImage.setVisible(false);

    //attach portraits to their respective variables
    juanitaPortrait = new Portrait(this,portraitPosX,portraitPosY,"juanita",juanitaDialogue)
    dudesPortrait = new Portrait(this,portraitPosX,portraitPosY,"dudes",dudesDialogue);
    erethPortrait = new Portrait(this,portraitPosX,portraitPosY,"ereth",erethDialogue);
    phorPortrait = new Portrait(this,portraitPosX,portraitPosY,"phor",phorDialogue);
    fyvePortrait= this.add.image(portraitPosX,portraitPosY,'fyvePortrait');
    ceesePortrait = new Portrait(this,portraitPosX,portraitPosY,"ceese",ceeseDialogue);

    fyvePortrait.setScale(0.5);
    fyvePortrait.setVisible(false);

  }

  update() {
    if (dialogueSwitch == true) {

      dialogueBox.setVisible(true);
      currentDialogue.setVisible(true);

      juanitaPortrait.displayPortrait();
      dudesPortrait.displayPortrait();
      erethPortrait.displayPortrait();
      phorPortrait.displayPortrait();
      ceesePortrait.displayPortrait();
    }

    if (dialogueSwitch == false) {
      currentDialogue.setVisible(false);
      dialogueBox.setVisible(false);
      currentSpeakerImage.setVisible(false);
      fyvePortrait.setVisible(false);
      juanitaPortrait.portrait.setVisible(false);
      dudesPortrait.portrait.setVisible(false);
      erethPortrait.portrait.setVisible(false);
      phorPortrait.portrait.setVisible(false);
      ceesePortrait.portrait.setVisible(false);


    }
  }
}
