"use strict";

/*****************

CLOUDY WITH A CHANCE OF ACCURATE TITLE
Nguyen PHuong Hao

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
//Variable to store the keywords JSON file
let keywords;

//Constant to store the number of options
const NUM_OPTIONS = 8;

//Constant to store the number of keyword in each option
const NUM_KEYWORDS = 5;

//Array to store the options
let options = [];

//Array to store the right answer
let answer = [];

//Setup the program
$(document).ready(setup);


// setup()
//
// Click on the prompt to start the program
function setup() {
  $('#click-to-begin').on('click', startGame);
}

// startGame()
//
// Remove the click to begin and set up the playground
function startGame() {
  //remove the Click
  $('#click-to-begin').remove();

  //load the JSON file
  $.getJSON('data/kidKeywords.json', dataLoaded);
}

// dataLoaded()
//
// Execute the program after the data has been loaded
function dataLoaded(data) {
  console.log("This data has been loaded");
  keywords = data.keywords;

  $(document).keypress(function(event) {
    console.log('keypressed');
    if (event.which == 13) {
      console.log("omg");
      newRound();
    }
  })
}

function newRound() {
  //Pick random keywords from the list to form an array that is the correct answer
  for (let i=0; i<NUM_KEYWORDS; i++) {
    //Choose a random keyword from the list
    let keyword = keywords[Math.floor(Math.random()*keywords.length)]
    //Add the keyword to the answer array
    answer[i] = keyword;
    //compare this element to the other previous elements
    for (let t=0; t<i; t++){
      //if the current element is similar to the element in comparison
      if (answer[t] === answer[i]) {
        //redo the process
        i--;
      } else {
        //if not, keep processing
        i = i;
      }
    }
  }

  //Put that answer in a random position in the options array
  //The position should not exceeding the number of available options
  let correctPosition = Math.floor(Math.random()*NUM_OPTIONS);
  options[correctPosition] = answer;

  console.log(options);

  //Randomize 7 more titles to fill the options array
  for (let i = 0; i<NUM_OPTIONS; i++) {
    //if the current position is similar to the correct answer's position
    if (i = correctPosition) {
      //ignore it
      i = i;
    }
    //if not, create a new array that has the first element similar to the correct answer's first element
    //this is to create a daegree of confusion
    else {
      optionRandomizer(i)
    }
  }
}

function optionRandomizer(code) {
  //create an array that store this option
  let currentOption;
  //assign the same first element of the answer array to this option's array
  currentOption[i] = answer[0];
  //then randomize the rest
  for (var i=1; i<NUM_KEYWORDS; i++) {
    //Add a random keyword in the list to the currentOption's current element
    currentOption[i] = keywords[Math.floor(Math.random()*keywords.length)];
    console.log(currentOption);
    //Compare this element to the previous element
    for (let t=0; t<i; t++){
      //if the current element is similar to the element in comparison
      if (answer[t] === answer[i]) {
        //redo the process
        i--;
      } else {
        //if not, keep processing
        i = i;
      }
    }
  }
  //add this array to the options array
  options(code) = currentOption;
}
