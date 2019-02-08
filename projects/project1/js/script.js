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

//variable for the avatar
let $avatar;

//variable for background animation trigger
let backgroundTriggered = false;

//variable for canvas' background element
let $background;

$(document).ready(function() {
  //assign the variables to their respective element using id
  $circle3 = $('#c3');
  $circle2 = $('#c2');
  $avatar = $('#avatar');
  $background = $('#background');

  //variable for the circle's orientation
  let angle = 0;


  $(document).on('keydown', function(event) {
    if (event.keyCode == 39) {
      //if right arrow key is down, animate the circle and the character
      angle -= .6;

      setInterval(function(){
        $circle3.rotate(angle);
        $circle2.rotate(angle);
      },50);

      if($circle3.width() >= 1500) {
        $circle3.animate({
            width: '-=3px',
            height: '-=3px'
          },15);
        $circle2.animate({
          width: '-=2.4px',
          height: '-=2.4px',
          left: '+=.2px',
          top: '+=.2px'
        },15)
        $avatar.animate({
          left: '-=.43px',
          top: '-=.43px'
        },15);
        $('hgroup').animate({
          opacity: '-=.01'
        },15)
      }

      //speed up the scaling if circle's width gets smaller than 1500 and stop the scaling at 480
      if($circle3.width() >= 600 && $circle3.width() <= 1500) {
        $circle3.animate({
            width: '-=6px',
            height: '-=6px'
          },15);
        $circle2.animate({
          width: '-=6px',
          height: '-=6px'
        },15);
        $avatar.animate({
          left: '-=.86px',
          top: '-=.86px'
        },15);
      }

      //Display the smaller circle as the big circle gets smaller
      if ($circle3.width() >= 480 && $circle3.width() <= 600) {
        $circle3.animate({
            width: '-=6px',
            height: '-=6px'
          },15);
        $circle2.animate({
          opacity: '+=.05',
          width: '-=6px',
          height: '-=6px'
        },15);
        $avatar.animate({
          left: '-=.86px',
          top: '-=.86px'
        },15);
      }

      //trigger background animation once circle's width gets smaller than 480px
      if ($circle3.width() <= 520 && backgroundTriggered == false) {
        $background.animate({
          opacity: "+=1"
        },150);
        $circle3.attr("src","assets/images/circle31.png")
        backgroundTriggered = true;
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

function changeBackground() {
  $background.animate({
    opacity: "+=1"
  })
}
