// ellipse와 image

let angles = [30, 10, 45, 35, 60, 38, 75, 67];

function setup() {
  createCanvas(1280, 720);
  noStroke();
  noLoop();
}

function draw() {
  background(100);
  pieChart(300, angles);
}

function pieChart(diameter, data) {
  let lastAngle = 0;
  for(let i = 0; i < data.length; i++){
    let gray = map(i, 0, data.length - 1, 0, 255);
    console.log(gray);
    fill(gray);
    arc( width / 2,
    height /2 ,
    diameter,
    diameter,
    lastAngle,
    lastAngle + radians(angles[i])
    );
    lastAngle += radians(angles[i]);
  }
}

