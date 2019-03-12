"use strict";

/*****************

Title of Project
Author Name

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

  newRound();
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
  let correctPosition = Math.floor(Math.random()*NUM_OPTIONS);
  options[correctPosition] = answer;
  console.log(options);
}
