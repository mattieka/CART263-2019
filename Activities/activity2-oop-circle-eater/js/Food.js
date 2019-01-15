class Food extends Agent {
  constructor(x,y,color,lifeState,minSize,maxSize,currentSize) {
    super(x,y,currentSize,color,lifeState);
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.currentSize = random(this.minSize,this.maxSize);
  }

  display() {
    super.display();
  }

  foodReset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.currentSize = random(this.minSize,this.maxSize);
  }
}
