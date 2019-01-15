class Line extends Shape {
  constructor(x,y,size,x2,y2) {
    super(x,y,size);
    this.x2 = x2;
    this.y2 = y2;
  }

  update() {
    super.update()
    this.x2 += random(-1,1);
    this.y2 += random(-1,1);
  }

  display() {
    push();
      stroke("#00ff00");
      line(this.x,this.y,this.x2,this.y2);
    pop();
  }

}
