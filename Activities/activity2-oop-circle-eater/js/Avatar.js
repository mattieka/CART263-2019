class Avatar extends Agent {
  constructor(x,y,currentSize,color,lifeState,maxSize,shrinkRate) {
    super(x,y,currentSize,color,lifeState);
    this.maxSize = maxSize;
    this.shrinkRate = shrinkRate;
  }

  display() {
    super.display();
  }

  update() {
    if (this.lifeState === true) {
      this.x = mouseX;
      this.y = mouseY;
      this.currentSize = constrain(this.currentSize - this.shrinkRate,0,this.maxSize);
      if (this.currentSize === 0) {
        this.lifeState = false;
      }
    }
  }

  ateFood(food) {
    if (this.lifeState === true) {
      this.currentSize = constrain(this.currentSize + food.currentSize,0,this.maxSize);
      food.foodReset();
    }
  }

}
