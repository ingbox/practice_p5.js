// ellipse와 image
let img;
let smallPoint, largePoint;

function preload() {
  img = loadImage('https://yt3.ggpht.com/ytc/AKedOLRLfUJ--CMea7M9vsn3XnZk9Ocx2ZAZF9i6bWtT=s900-c-k-c0x00ffffff-no-rj');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  smallPoint = 4;
  largePoint = 40;
  imageMode(CENTER);
  noStroke();
  background(255);
  // img.loadPixels();
}

function draw() {
  let pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let pix = img.get(x, y);
  console.log(pix);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
}
