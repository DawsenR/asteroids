class Spaceship{
  constructor(){
    this.position = createVector(100,100);
    this.velocity = createVector(0,0);
    this.angle = 0;
    this.engine = .05;
    this.turnSpeed = 2;
    this.missiles = new Array();
    this.height = 12;
    this.crashed = false;
    this.winner = false;

  }

  drawShip(){
    this.detectOffScreen();
    this.drawMissiles();
    fill(255,255,255);
    this.checkWin();
    this.detectAsteroidHit();
    push();
    translate(this.position.x,this.position.y);
    rotate(this.angle);
    translate(-55,-60);

    // push();
    beginShape();
    vertex(55,50);
    vertex(45,75);
    vertex(55,67);
    vertex(65,75);
    endShape(CLOSE);
    pop();

    this.position.add(this.velocity);
  }

  checkWin(){
    if(asteroids.length == 0){
      this.winner = true;
      fill(0,255,0);
    }
  }

  drawMissiles(){
    for(var i=0;i<this.missiles.length;i++){
      this.missiles[i].drawMissile();
    }
  }

  detectOffScreen(){
    if(this.position.x<0){
      this.position.x = windowWidth;
    }
    if(this.position.x>windowWidth){
      this.position.x = 0;
    }
    if(this.position.y < 0){
      this.position.y = windowHeight;
    }
    if(this.position.y > windowHeight){
      this.position.y = 0;
    }
  }

  detectAsteroidHit(){
    for(var i =0;i<asteroids.length;i++){
      var distance = dist(asteroids[i].position.x,asteroids[i].position.y,this.position.x,this.position.y);
      if(distance<(asteroids[i].radius+(this.height))){ //asteroid hit
        fill(255,0,0);
        this.crashed = true;
      }
    }
  }

}

function keyPressed(){
  if(keyIsDown(LEFT_ARROW)){
		ship.angle -= ship.turnSpeed;
	}
	if(keyIsDown(RIGHT_ARROW)){
		ship.angle += ship.turnSpeed;
	}
	if(keyIsDown(UP_ARROW)){
		ship.velocity.x += ship.engine*sin(ship.angle);
    ship.velocity.y -= ship.engine*cos(ship.angle);
    // print(ship.angle + "    :ship angle");
    // print(ship.velocity.x + "    :x");
    // print(ship.velocity.y + "    :y");
	}
  if(keyIsDown(DOWN_ARROW)){
    if(ship.velocity.x > 0){
      ship.velocity.x-= ship.engine;
    }
    if(ship.velocity.x < 0){
      ship.velocity.x+= ship.engine;
    }
    if(ship.velocity.y > 0){
      ship.velocity.y-= ship.engine;
    }
    if(ship.velocity.y<0){
      ship.velocity.y+= ship.engine;
    }
    if(abs(ship.velocity.y)<ship.engine && abs(ship.velocity.x)<ship.engine){
      ship.velocity.y = 0;
      ship.velocity.x = 0;
    }
	}
   if(keyCode == 32){
     //delay(500);
     missile = new Missile(ship.position.x,ship.position.y,ship.angle,ship.velocity.x,ship.velocity.y);
     ship.missiles.push(missile);
     keyCode = 0;
   }
   if(keyCode == 114){
    //ship.crashed = false;
    ship = new Spaceship();
   	makeAsteroids();
    print("replay");
   }

}
