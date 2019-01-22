"use strict";

/*****************

OOP Circle Eater
Pippin Barr

An Object-Oriented version of the Circle Eater program.
The player moves a circle around with the mouse.
Another circle represents food which the player eats by overlapping.
The player circle shrinks over time, but grows when it eats.

******************/

// Constants for key quantities
const AVATAR_MAX_SIZE = 64;
const AVATAR_SIZE_LOSS_PER_FRAME = 0.5;
const FOOD_MIN_SIZE = 5;
const FOOD_MAX_SIZE = 100;
const FOOD_MAX_SPEED = 20;

// Variables to store the two key objects
let avatar;
let food;


// preload()
//
// Not needed

function preload() {

}


// setup()
//
// Create the canvas, avatar, and food, disable the cursor

function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS_PER_FRAME)
  food = new Food(random(width),random(height),50,color(0,255,0),FOOD_MIN_SIZE,FOOD_MAX_SIZE,FOOD_MAX_SPEED);
  noCursor();
}


// draw()
//
// Clear the background
// Update the avatar and check for eating
// Display the avatar and food

function draw() {

  //Don't run if the avatar has disappeared
  if(!avatar.active) {
    return;
  }

  background(0);

  avatar.update();
  food.update();
  if (avatar.collide(food)) {
    avatar.eat(food);
  }
  avatar.display();
  food.display();
}