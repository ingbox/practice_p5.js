// ellipse와 image
let y = 0;
let easing = 0.05;
let offset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage('https://yt3.ggpht.com/ytc/AKedOLRLfUJ--CMea7M9vsn3XnZk9Ocx2ZAZF9i6bWtT=s900-c-k-c0x00ffffff-no-rj');
  move_img = loadImage('https://yt3.ggpht.com/ytc/AKedOLRLfUJ--CMea7M9vsn3XnZk9Ocx2ZAZF9i6bWtT=s900-c-k-c0x00ffffff-no-rj');
}

// function draw() {
//   image(img, 0, 0);
//   image(img, 0, height / 2, img.width / 2, img.height / 2);
// }

function draw() {
  background(img);
  let dx = mouseX - img.width / 2 - offset;


  // image(move_img, 0, 0);
  offset += dx * easing;
  tint(255, 127);

  console.log(offset);

  image(move_img, offset, 0)

  stroke(226, 204, 0);
  line(0, y, width, y);
  y++;

  if(y > height) {
    y = 0;
  }
}
