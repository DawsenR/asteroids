var asteroids = new Array(1);
var sizes = ['S','M','L','X'];

class Asteroid{
  constructor(size = 'S', transX, transY){
    this.transX = transX;
    this.transY = transY;

    this.position = createVector(this.transX,this.transY);
    this.velocity = createVector(0,0);
    this.angle = 0;
    this.rotation = .25;

    this.size = size;
    this.radius = 0;
    this.health = 0;
    this.alive = true;
    this.rockiness = 75;
    this.xLeft = 0; //*********************
    this.xRight = 250;//********************
    this.yTop = 0;//***********************
    this.yBottom = 250;//*******************
    this.rightMax = this.xRight+this.rockiness;
    this.bottomMax = this.yBottom+this.rockiness;

    this.div = 1;

    switch(this.size){
      case 'S':
        this.health = 1;
        this.div = 6;
        this.velocity.x = random(-5,5);
        this.velocity.y = random(-5,5);
        break;

      case 'M':
        this.health = 4;
        this.div = 4;
        this.velocity.x = random(-3,3);
        this.velocity.y = random(-3,3);
        break;

      case 'L':
        this.health = 6;
        this.div = 2;
        this.velocity.x = random(-1,1);
        this.velocity.y = random(-1,1);
        break;

      case 'X':
        this.health = 10;
        this.div = 1;
        this.velocity.x = random(-.5,.5);
        this.velocity.y = random(-.5,.5);
        break;

      default:
        print("not giving correct health to asteroid");
        break;
    }
    this.radius = (this.xRight/this.div)/2;

    this.center = createVector((this.xRight-this.xLeft)/2,(this.yBottom-this.yTop)/2);

    this.leftXRand = random(this.xLeft-40,this.xLeft-10);
    this.leftYRand = random(this.yTop+20,this.yBottom-20);
    this.topXRand = random(this.xLeft+20,this.xRight-20);
    this.topYRand = random(this.yTop-40,this.yTop-10);
    this.rightXRand = random(this.xRight+10,this.rightMax);
    this.rightYRand = random(this.yTop+20,this.yBottom-20);
    this.bottomXRand = random(this.xLeft+20,this.xRight-20);
    this.bottomYRand = random(this.yBottom+10,this.bottomMax);
  }

  drawAsteroid(){
    push();
    translate(this.position.x,this.position.y);
    //translate(this.center.x,this.center.y);
    rotate(this.angle);
    this.detectMissileHit();

    stroke(255);
    fill(0);
    beginShape();

    translate(-(this.xRight-this.xLeft)/(2*this.div),-(this.yBottom-this.yTop)/(2*this.div));
    vertex(this.xLeft/this.div,this.yTop/this.div);
    vertex(this.topXRand/this.div,this.topYRand/this.div);
    vertex(this.xRight/this.div,this.yTop/this.div);
    vertex(this.rightXRand/this.div,this.rightYRand/this.div);
    vertex(this.xRight/this.div,this.yBottom/this.div);
    vertex(this.bottomXRand/this.div,this.bottomYRand/this.div);
    vertex(this.xLeft/this.div,this.yBottom/this.div);
    vertex(this.leftXRand/this.div,this.leftYRand/this.div);

    endShape(CLOSE);
    translate((this.xRight-this.xLeft)/(2*this.div),(this.yBottom-this.yTop)/(2*this.div));
    translate(-this.center.x,-this.center.y);
    translate(-this.position.x,-this.position.y);
    pop();

    this.detectOffScreen();
  }

  detectMissileHit(){
    strokeWeight(1);
    for(var i =0;i<ship.missiles.length;i++){
      var distance = dist(ship.missiles[i].position.x,ship.missiles[i].position.y,this.position.x,this.position.y);
      if(distance<(this.radius+(ship.missiles[i].height))){ //asteroid hit
        ship.missiles.splice(i,1);
        this.health -= 1;
        strokeWeight(3);
        if(this.health<=0){
          this.explode();
        }
      }else{
        if(ship.missiles[i].offScreen){
          ship.missiles.splice(i,1);
        }
      }
    }
  }

  explode(){
    switch(this.size){
      case 'S':
        break;

      case 'M':
        asteroids.push(new Asteroid('S',this.position.x,this.position.y));
        asteroids.push(new Asteroid('S',this.position.x,this.position.y));
        break;

      case 'L':
        asteroids.push(new Asteroid('S',this.position.x,this.position.y));
        asteroids.push(new Asteroid('M',this.position.x,this.position.y));
        break;

      case 'X':
        asteroids.push(new Asteroid('M',this.position.x,this.position.y));
        asteroids.push(new Asteroid('M',this.position.x,this.position.y));
        break;

      default:
        print("not exploding correctly");
        break;
    }

    asteroids.splice(asteroids.indexOf(this),1);
  }

  detectOffScreen(){
      if(this.position.x<0-(windowWidth/2)){
        this.position.x = windowWidth+(windowWidth/2);
      }
      if(this.position.x>windowWidth+(windowWidth/2)){
        this.position.x = 0-(windowWidth/2);
      }
      if(this.position.y < 0-(windowHeight/2)){
        this.position.y = windowHeight+(windowHeight/2);
      }
      if(this.position.y > windowHeight+(windowHeight/2)){
        this.position.y = 0-(windowHeight/2);
      }
  }
}

function makeAsteroids(){
  for(var i = 0; i< asteroids.length;i++){
    asteroids[i] = new Asteroid(random(sizes),random(0-windowWidth/2,windowWidth+windowWidth/2),random(0-windowHeight/2,windowHeight+windowHeight/2));
  }
}

function updateAsteroids(){
  for(var i = 0; i<asteroids.length;i++){
    asteroids[i].position.add(asteroids[i].velocity);
    asteroids[i].angle += asteroids[i].rotation;
    asteroids[i].drawAsteroid();
  }

}
