// ellipse와 image


function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('container');
}

function draw() {
  clear();
  // console.log(document.body.clientHeight);

  let yPos = map(pageYOffset, 0, document.body.clientHeight - windowHeight, 0, height);
  console.log(yPos);
  ellipse(width / 2, yPos, 50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}