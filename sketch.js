var timer = 1000;
var asteroidNum = 100;

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Spaceship();
	makeAsteroids();
	angleMode(DEGREES);
	rectMode(CENTER);
}

function draw() {
	keyPressed();
	if(!ship.crashed){
		background(0);
		ship.drawShip();
		updateAsteroids();
	}
}
