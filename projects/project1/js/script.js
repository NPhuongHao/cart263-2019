"use strict";

/*****************

Path of life
Nguyen Phuong Hao

This is a project for CART 212, Concordia University.
The player is prompted to keep moving forward, only to realize at the end that they're moving in circle.
The project attempts to represent one aspect of Albert Camus' Sisyphus, when what matters in life is to move forward despite how fruitless it is.

******************/

//variables for the circles
let $circle2;
let $circle1;

//variable for the avatar
let $avatar;

//variable for the ending text
let $textEnd;

//variable for background animation trigger
let backgroundTriggered = false;

//variable for canvas' background element
let $background;

//variable for the circle's orientation
let angle = 0;
let angle2 = 0;

$(document).ready(function() {
  //assign the variables to their respective element using id
  $circle2 = $('#c2');
  $circle1 = $('#c1');
  $avatar = $('#avatar');
  $background = $('#background');
  $textEnd = $('#textEnd');

  //
  //Trigger animation when the right arrow key is down using keydown
  $(document).on('keydown', function(event) {
    if (event.keyCode == 39) {
      //if right arrow key is down, animate the circle and the avatar

      //start rotating the circles
      rotateCircles();

      //Resize and relocate the circle and avatar until the big circle's size reaches 1500px
      if($circle2.width() >= 1500) {
        updateCircles(3, 2.4, 0.2, 0);
        updateAvatar(.07, .12, .33);
        //makes the titles vanish
        $('hgroup').animate({
          opacity: '-=.01'
        },15)
      }

      //speed up the scaling if circle's width gets smaller than 1500 and stop the current scaling at 600
      if($circle2.width() >= 600 && $circle2.width() <= 1500) {
        updateCircles(6, 6, 0, 0);
        updateAvatar(.1, .16, .83);
      }

      //Display the smaller circle (opacity increase = 0.05) and slow down the avatar's scaling as the big circle gets smaller
      if ($circle2.width() >= 480 && $circle2.width() <= 600) {
        updateCircles(6, 6, 0, 0.05);
        updateAvatar(.05, .12, .43);
      }

      //trigger animation once circle's width gets smaller than 520px
      if ($circle2.width() <= 520 && backgroundTriggered == false) {
        //Display the background
        $background.animate({
          opacity: "+=1"
        },150);
        //Display the ending text
        $textEnd.animate({
          opacity: "+=1"
        },550);
        //change the big circle's visual (to make it prettier)
        $circle2.attr("src","assets/images/circle31.png");
        //animation won't be triggered again
        backgroundTriggered = true;

      }


    }
  });


  //stop the rotation and the scaling of the circles and avatar if right arrow key is released
  $(document).on('keyup', function(event) {
    if (event.keyCode == 39) {
      $circle2.stopRotate();
      $circle2.stop();
      $circle1.stopRotate();
      $circle1.stop();
      $avatar.stop();
    }
  })

});

//
//rotate the pathway circles
function rotateCircles() {
  //Decrease angle
  angle -= 0.6;
  angle2 -= 0.8;
  //move the circles backward a certain angle each 50 frames using the jQueryRotate library
  setInterval(function(){
    $circle2.rotate(angle);
    $circle1.rotate(angle2);//The smaller circle moves faster than the bigger one
  },50);
}

//
//Resize and relocate the pathway circles
function updateCircles(circle2Size, circle1Size, circle1Position,circle1Opacity) {
  //resize and relocate the circles each 15 mils
  $circle2.animate({
      width: '-='+circle2Size+'px',
      height: '-='+circle2Size+'px'
    },15);
  $circle1.animate({
    width: '-='+circle1Size+'px',
    height: '-='+circle1Size+'px',
    left: '+='+circle1Position+'px',
    top: '+='+circle1Position+'px',
    opacity: '+='+circle1Opacity,
  },15)
}

//
//Resize and relocate the avatar
function updateAvatar(width, height, position) {
  //resize and relocate the avatar each 15 mils with animate()
  $avatar.animate({
    width: '-='+width,
    height: '-='+height,
    left: '-='+position+'px',
    top: '-='+position+'px'
  },15);
}
