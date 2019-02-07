"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let $circle3;
let $circle2;
let $circle1;

let $avatar;

$(document).ready(function() {
  $circle3 = $('#c3');
  $circle2 = $('#c2');
  $circle1 = $('#c1');

  $avatar = $('#avatar');

  let angle = .5;
  let initialSize = 420;
  let sizeLoss = 10;

  $(document).on('keydown', function(event) {
    if (event.keyCode == 39) {
      angle -= .8;

      setInterval(function(){
        $circle3.rotate(angle);
      },50);

      if($circle3.width() >= 1500) {
        $circle3.animate({
            width: '-=3px',
            height: '-=3px'
          },30);
        $avatar.animate({
          left: '-=.43px',
          top: '-=.43px'
        },30);
      }

      if($circle3.width() >= 480 && $circle3.width() <= 1500) {
        $circle3.animate({
            width: '-=6px',
            height: '-=6px'
          },30);
        $avatar.animate({
          left: '-=.86px',
          top: '-=.86px'
        },30);
      }

    }
  });

  $(document).on('keyup', function(event) {
    if (event.keyCode == 39) {
      $circle3.stopRotate()
      $circle3.stop();
    }
  })

});
