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
		//keyPressed();
		background(0);
		ship.drawShip();
		updateAsteroids();
	}
}
