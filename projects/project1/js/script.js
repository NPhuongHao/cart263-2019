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

  $avatar = $('avatar');

  let angle = .5;
  let initialSize = 420;
  const SIZE_LOSS = 10;

  $(document).on('keydown', function(event) {
    if (event.keyCode == 39) {
      angle-=.5;

      setInterval(function(){
        $circle3.rotate(angle);

      },50);

    }
  });
  $(document).on('keyup', function(event) {
    if (event.keyCode == 39) {
      $circle3.stopRotate();
    }
  })

});
