// ellipse와 image

trPos = [0, 0];
targetPos = [0, 0];
xUnit = 0;
yUnit = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(100);
  noFill();
  stroke(255);
  push();
  if ( abs(targetPos[0] - trPos[0]) > abs(xUnit) ) {
  trPos[0] += xUnit;
  trPos[1] += yUnit;
  }
  translate(trPos[0], trPos[1], 0);
  sphere(100);
  pop();
}


function mouseClicked() {
  targetPos[0] = mouseX - width / 2;
  targetPos[1] = mouseY - height / 2;
 
  xUnit = (targetPos[0] - trPos[0]) * 0.02;
  yUnit = (targetPos[1] - trPos[1]) * 0.02;
}