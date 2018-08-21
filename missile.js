class Missile{
  constructor(x,y,angle,xVel,yVel){
    this.angle = angle;
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.speed = 10;
    this.velocity.x += this.speed*sin(this.angle);
    this.velocity.y -= this.speed*cos(this.angle);
    this.width = 4;
    this.height = 16;
    this.offScreen = false;

  }

  drawMissile(){
    this.detectOffScreen();
    push();
    translate(this.position.x,this.position.y);
    rotate(this.angle);
    translate(-this.position.x,-this.position.y);
    rect(this.position.x,this.position.y,this.width,this.height);
    pop();

    this.position.add(this.velocity);
  }

  detectOffScreen(){
      if(this.position.x<0-(windowWidth/2)){
        this.offScreen = true;
      }
      if(this.position.x>windowWidth+(windowWidth/2)){
        this.offScreen = true;
      }
      if(this.position.y < 0-(windowHeight/2)){
        this.offScreen = true;
      }
      if(this.position.y > windowHeight+(windowHeight/2)){
        this.offScreen = true;
      }
  }
}
