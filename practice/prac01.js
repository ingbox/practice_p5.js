// ellipse와 image

let pg;

function setup() {
  createCanvas(1280, 720);
  pg = createGraphics(400, 250);
}

function draw() {
  fill(0, 0, 0);
  rect(0, 0, width, height);
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 60, 60);

  pg.background(51);
  pg.noFill();
  pg.stroke(255);
  pg.ellipse(mouseX - 150, mouseY - 75, 60, 60);

  image(pg, 150, 75);
}

