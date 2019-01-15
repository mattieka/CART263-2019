class Agent {
  constructor (x,y,currentSize,color,lifeState) {
    this.x = x;
    this.y = y;
    this.currentSize = currentSize;
    this.color = color;
    this.lifeState = lifeState;
  }

  display() {
    if (this.lifeState === true) {
      push();
        noStroke();
        fill(this.color);
        ellipse(this.x,this.y,this.currentSize,this.currentSize);
      pop();
    }
  }

  checkCollision(agent) {
    if (this.lifeState === true) {
      let distance;
      distance = dist(this.x,this.y,agent.x,agent.y);
      if (distance < this.currentSize/2 + agent.currentSize/2) {
        console.log("overlapped!");
        return true;
      } else {
        return false;
      }
    }
  }

}
