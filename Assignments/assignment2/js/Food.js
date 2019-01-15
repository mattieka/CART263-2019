/******************************************************************************
                                FOOD CLASS
******************************************************************************/
// A class to represent food, mostly just involves the ability to be
// a random size and to reset

class Food extends Agent {

// CONSTRUCTOR --------------------------------------------------------------
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Also set a minimum and maximum size for this food object which it
  // will vary between when it resets
  constructor(x,y,minSize,maxSize,maxSpeed,vx,vy) {
    super(x,y,random(minSize,maxSize),'#55cccc');
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.maxSpeed = FOOD_MAX_SPEED;
    this.vx = random(-FOOD_MAX_SPEED,FOOD_MAX_SPEED);
    this.vy = random(-FOOD_MAX_SPEED,FOOD_MAX_SPEED);
  }

// RESET FUNCTION -----------------------------------------------------------
  //
  // Set position to a random location on the canvas
  // Set the size to a random size within the limits
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.vx = random(-FOOD_MAX_SPEED,FOOD_MAX_SPEED);
    this.vy = random(-FOOD_MAX_SPEED,FOOD_MAX_SPEED);
    this.size = random(this.minSize,this.maxSize);
  }

// UPDATE FUNCTION ---------------------------------------------------------
  update() {

    //update position based on velocity
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    //screen wrapping
    if (this.x <= 0) {
      this.x = width-this.size/2;
    }

    if (this.x >= width) {
      this.x = this.size/2;
    }

    if (this.y <= 0) {
      this.y = height - this.size/2;
    }

    if (this.y >= windowHeight) {
      this.y = this.size/2;
    }

    //randomly change velocity
    let changeVelocity = random(1,10);
    console.log(changeVelocity);
    if (changeVelocity >= 9) {
      this.vx = random(-FOOD_MAX_SPEED,FOOD_MAX_SPEED);
      this.vy = random(-FOOD_MAX_SPEED,FOOD_MAX_SPEED);
    }
  }
}
