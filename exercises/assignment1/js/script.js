"use strict";

//set up the avatar
let avatar = {
  x: 0,
  y: 0,
  size: 64,
  maxSize: 64,
  active: true,
  color: "#ff0000"
}

//set up the food
let food = {
  x: 0,
  y: 0,
  tx: 0,
  ty: 0,
  vx: 0,
  vy: 0,
  size: 50,
  maxSize: 50,
  maxSpeed: 20,
  color: "#00ff00"
}

//reduce or increase the avatar's size per frame
const HEALTH_LOSS = 0.5;
const HEALTH_GAIN = 50;

function preload() {}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //set up food's position with random x and y position and random velocities' noise parameters
  food.x = random(0,width);
  food.y = random(0,height);
  food.tx = random(0,1000);
  food.ty = random(0,1000);
}

function draw() {
  //check if the avatar is still on screen
  if (!avatar.active) {
    // By using "return" the draw() function exits immediately
    return;
  }
  //set background color
  background(50,50,90);

  //update avatar's and food's position
  updateAvatar();
  updateFood();

  //handle collision between avatar and food
  handleCollision();

  //display food and avatar on screen
  display(food);
  display(avatar);

}

function updateAvatar() {
  avatar.x = mouseX;
  avatar.y = mouseY;

  //each frame the avatar's size is reduced by HEALTH_LOSS
  avatar.size = constrain(avatar.size-HEALTH_LOSS, 0, avatar.maxSize);

  //if avatar's size is reduced to 0, avatar becomes inactive
  if (avatar.size == 0) {
    avatar.active = false;
    console.log("GAME OVER!");
  }
}

function updateFood() {
  //set up random velocities based on perlin noise
  food.vx = map(noise(food.tx), 0, 1, -food.maxSpeed, food.maxSpeed);
  food.vy = map(noise(food.ty), 0, 1, -food.maxSpeed, food.maxSpeed);

  food.x += food.vx;
  food.y += food.vy;

  //warp the food to the other side of the screen if it crosses the canvas' borders
  if(food.x < 0) {
    food.x += width;
  } else if (food.x > width) {
    food.x -= width;
  }

  if (food.y < 0) {
    food.y += height;
  } else if (food.y > height) {
    food.y -= height;
  }

  //update the noise parameters (the greater the margin, the more erratic the movement)
  food.tx += 0.01;
  food.ty += 0.01;
}

function display(subject) {
  push();
  noStroke();
  fill(subject.color);
  ellipse(subject.x, subject.y, subject.size, subject.size);
  pop();
}

function handleCollision() {
  var d = dist(avatar.x, avatar.y, food.x, food.y);
  if (d <= (avatar.size/2 + food.size/2)) {
    //reset the food to a random position
    food.x = random(0,width);
    food.y = random(0,height);
    //grow avatar's size by HEALTH_GAIN
    avatar.size = constrain(avatar.size + HEALTH_GAIN, 0, avatar.maxSize);
    //randomize the new food's size
    food.size = random(20,food.maxSize);
  }
}
