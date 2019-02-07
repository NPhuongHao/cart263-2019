"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

//variables for the circles
let $circle3;
let $circle2;
let $circle1;

//variable for the avatar
let $avatar;

$(document).ready(function() {
  //assign the variables to their respective element using id
  $circle3 = $('#c3');
  $circle2 = $('#c2');
  $circle1 = $('#c1');
  $avatar = $('#avatar');

  //variable for the circle's orientation
  let angle = 0;


  $(document).on('keydown', function(event) {
    if (event.keyCode == 39) {
      //if right arrow key is down, animate the circle and the character
      angle -= .6;

      setInterval(function(){
        $circle3.rotate(angle);
      },50);

      if($circle3.width() >= 1500) {
        $circle3.animate({
            width: '-=3px',
            height: '-=3px'
          },15);
        $avatar.animate({
          left: '-=.43px',
          top: '-=.43px'
        },15);
      }

      //speed up the scaling if circle's width gets smaller than 1500 and stop the scaling at 480
      if($circle3.width() >= 480 && $circle3.width() <= 1500) {
        $circle3.animate({
            width: '-=6px',
            height: '-=6px'
          },15);
        $avatar.animate({
          left: '-=.86px',
          top: '-=.86px'
        },15);
      }

    }
  });

  //stop the rotation and the scaling if right arrow key is released
  $(document).on('keyup', function(event) {
    if (event.keyCode == 39) {
      $circle3.stopRotate()
      $circle3.stop();
    }
  })

});
