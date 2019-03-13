"use strict";

/*****************

CLOUDY WITH A CHANCE OF SENSIBLE TITLE
Nguyen PHuong Hao

Soak yourself under the heavy rain of popular kids-friendly Youtube video titles!
Do they look similar? Yes!
Are they the same video? Most likely no.
Read your keywords carefully, then choose the right answer
by pronoucning its code (from 1 to 8, as you can see), or just click on it.

******************/
//Variable to store the keywords JSON file
let keywords;

//Variable to check if the game has started
let gameStarted = false;

//Variable to store the instruction
let $instruction;

//Constant to store the number of options
const NUM_OPTIONS = 8;

//Constant to store the number of keyword in each option
const NUM_KEYWORDS = 5;

//Array to store the options
let options = [];

//Array to store the html element of each option
let $optionsHTML = [];

//variable to check the number of titles that have exited the screen
let exitedTitles = 0;

//Array to store the right answer
let answer = [];
//Variable to store the right's answer position in the options array
let answerPosition;

//Variable for the annyang commands
let commands;

//Variable for the score
let score = 0;

//Variable for the minimum animation duration of the titles
let minimumDuration;

//Variables for the sound effects and songs
let bgm;
let endingbgm;
let wrong;
let correct;

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

//Setup the program
$(document).ready(setup);

// setup()
//
// Click on the prompt to start the program
function setup() {
  $('#click-to-begin').on('click', startGame);

  //load the sound files
  wrong = new Audio('./assets/sounds/wrong.mp3');
  correct = new Audio('./assets/sounds/correct.mp3');
  bgm = new Audio('./assets/sounds/Nursery.mp3');
  endingbgm = new Audio('./assets/sounds/Ending.mp3');

  //Add annyang commands
  commands = {
    //If the player gives up, change to another round, reset score to 0
    'i give up' : function() {
      //reset the game's state
      resetState();
      //call newRound
      newRound();
      //reset score to 0
      score = 0;
    },

    '*X': function(X) {
      if(X == answerPosition+1) {
        rightAnswer();
      } else {
        wrongAnswer();
      }
    }
  };

  annyang.addCommands(commands);
}

// startGame()
//
// Remove the click to begin and set up the playground
function startGame() {
  //play the BGM
  bgm.play();
  bgm.loop = true;

  //remove the Click
  $('hgroup').animate({
    opacity: '-=1'
  }, 1000, function() {
    $('hgroup').remove();
  });

  //Reveal the code numbers
  $('#numbers').animate({
    opacity: '+=0.5'
  },1000);

  //load the JSON file
  $.getJSON('data/kidKeywords.json', dataLoaded);

  $instruction = $('<div id="instruction">Soak yourself under the heavy rain of popular kids-friendly Youtube video titles! Do they look similar? Yes! Are they the same video? Most likely no. <br> Read your keywords carefully, then choose the right answer by pronoucning its code (from 1 to 8, as you can see), or click on the right answer.<br> Press ENTER to start selecting.</div>')
  $('#playground').append($instruction);
  $instruction.animate({
    opacity: '+=1'
  },1000);

}


// dataLoaded()
//
// Execute the program after the data has been loaded
function dataLoaded(data) {
  keywords = data.keywords;
  $(document).keypress(function(event) {
    if (event.which == 13) {
      if(gameStarted == false) {
        $instruction.animate({
          opacity: '-=1'
        },500, function() {
          newRound();
        });
        gameStarted = true;
        //Start annyang
        annyang.start();
      }
    }
  });
}

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

//newRound()
//
//Call new round
function newRound() {

  //Display score
  $("#score").text("SCORE: " + score);

  //Pick random keywords from the list to form an array that is the correct answer
  generateCorrectAnswer();

  displayAnswer();

  //Randomize more titles to fill the options array, along with the correct answer
  fillOptions();
  //Display the titles on screen
  displayOptions();
  //Animate the titles' movements
  moveOptions();

  //check the answer by clicking
  $(".title").on("click", function() {
    if ($(this).hasClass('right-answer')) {
      rightAnswer();
    } else {
      wrongAnswer();
    }
  });

}

//displayAnswer()
//
// This function displays the right answer on screen when starting a new round
function displayAnswer() {
  //remove the Click
  $('#answer').animate({
    opacity: '-=1'
  }, 1000, function() {
    $('#answer').remove();
  });
  //Add the div element
  let $answer = $('<div id="answer"></div>')
  $('#playground').append($answer);
  //Assemble the answer array's elements into a string
  let $content = `${answer[0]} ${answer[1]} ${answer[2]} ${answer[3]} ${answer[4]}`;
  //Add the string to the div element
  $answer.append($content);
  //Keep its initial opacity at 0
  $answer.css("opacity", "0");
  //Increase its opacity gradually with animate()
  $answer.animate({
    opacity: '+=1'
  },1000);
}

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


//generateCorrectAnswer()
//
//This function picks random keywords from the list to form an array that is the correct answer
function generateCorrectAnswer() {
  for (let i=0; i<NUM_KEYWORDS; i++) {
    //Choose a random keyword from the list
    let keyword = keywords[Math.floor(Math.random()*keywords.length)];
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
}


//fillOptions()
//
//This function fills the options array with random options, along with the correct answer
function fillOptions() {
  //Put the correct answer in a random position in the options array
  //The position number should not exceeding the number of available options
  answerPosition = Math.floor(Math.random()*NUM_OPTIONS);
  options[answerPosition] = answer;
  //Randomize more titles to fill in the options array
  for (let i = 0; i<NUM_OPTIONS; i++) {
    //if the current position is similar to the correct answer's position
    if (i == answerPosition) {
      //ignore it
      i = i;
    }
    //if not, create a new array that has the first element similar to the correct answer's first element
    //this is to create a degree of confusion
    else {
      options[i] = optionRandomizer();
    }
  }
}


//optionRandomizer()
//
// This function is to generate a random array that has the same first element with the answer array
function optionRandomizer() {
  //create an array that store this option
  let currentOption = [];
  //assign the same first element of the answer array to this option's array
  currentOption[0] = answer[0];
  //then randomize the rest
  for (var i=1; i<NUM_KEYWORDS; i++) {
    //Add a random keyword in the list to the currentOption's current element
    currentOption[i] = keywords[Math.floor(Math.random()*keywords.length)];
    //Compare this element to the previous element
    for (let t=0; t<i; t++){
      //if the current element is similar to the element in comparison
      if (currentOption[t] == currentOption[i]) {
        //redo the process
        i--;
      } else {
        //if not, keep processing
        i = i;
      }
    }
  }
  //add this array to the options array
  return currentOption;
}

//displayOptions()
//
// Display the title options
function displayOptions() {

  //remove the old elements
  $('#list-titles').remove();


  //create a div element to contain the titles
  let $ul = $('<div id="list-titles"></div>');
  $('#playground').append($ul);

  //create a new element for each title
  for (let i=0; i<NUM_OPTIONS; i++) {
    let $li = $('<div class="title" id="title-code-'+i+'"></div>');
    //display this element inside the parent div element
    $ul.append($li);
    //write out the title
    let title = `${options[i][0]} ${options[i][1]} ${options[i][2]} ${options[i][3]} ${options[i][4]}`
    //display the title using append()
    $li.append(title);
  }
}

//addOptions()
//
// Animate the title options
function moveOptions() {
  //The distance by which each title move is equa to the playground's height
  let distance = $('#playground').css("height");
  //Assign each HTML element to a $optionsHTML element and animate it
  for (let i=0; i<NUM_OPTIONS; i++) {
    //set up a random duration from 10000ms to 15000ms
    minimumDuration = 10000;
    let time = Math.random()*5000+ minimumDuration;
    //Retrieve the HTML element according to the current array element
    $optionsHTML[i] = $('#title-code-'+i);
    //Add a "right-answer" class to the element containing the right answer
    $('#title-code-'+answerPosition).addClass('right-answer');
    //Increase the HTML element's top margin so that it looks like it's moving downward
    $optionsHTML[i].animate({
      "margin-top": "+="+distance,
    }, time, function() {
      exitedTitles++;
      if (exitedTitles == NUM_OPTIONS) {
        resetState();
        score = 0;
        newRound();
      }
    });
  }
}

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

//rightAnswer()
//
//This function decides what happens when the right Answer is chosen
function rightAnswer() {
  //add 1 to the score
  score++;
  //play the ding sound
  correct.play();
  //change the element's visual
  $optionsHTML[answerPosition].css({"background-color":"black", "color":"white"});
  //reset
  resetState();
  //call a new round
  newRound();
  //call the ending if the score reaches 8
  if (score == 10) {
    ending();
  }
}

//wrongAnswer()
//
//This function decides what happens when the wrong Answer is chosen
function wrongAnswer() {
  // Otherwise they were wrong, play the beep sound
  wrong.play();
  //reset score to 0
  score = 0;
  //Display SCORE
  $("#score").text("SCORE: " + score);
  // Play the correct answer
  //retrieve the text element
  let $correctAnswer = `${answer[0]} ${answer[1]} ${answer[2]} ${answer[3]} ${answer[4]}`;
  //set random optiosn for pitch
  let options = {
    pitch: Math.random(),
  };
  //play the sound
  responsiveVoice.speak($correctAnswer,'UK English Female',options);
}

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


//ending()
//
//This function decides how the program will behave after the player reach ending.
function ending() {
  //stop the bgm and play the ending bgm
  bgm.pause();
  endingbgm.play();
  endingbgm.loop = true;
  //speed up the pacing
  minimumDuration = 5000;
  //Make a mess of options
  for (let i=0; i<10; i++){
    //create a div element to contain the titles
    let $ul = $('<div id="list-titles"></div>');
    $('#playground').append($ul);

    //create a new element for each title
    for (let i=0; i<NUM_OPTIONS; i++) {
      let $li = $('<div class="title" id="title-code-'+i+'"></div>');
      //display this element inside the parent div element
      $ul.append($li);
      //write out the title
      let title = `${options[i][0]} ${options[i][1]} ${options[i][2]} ${options[i][3]} ${options[i][4]}`
      //display the title using append()
      $li.append(title);
    }
  }
  //stop the program
  window.stop();
}

//resetState()
//
//reset the game's state
function resetState() {
  //finish the animations
  for (let i=0; i<NUM_OPTIONS; i++) {
    $optionsHTML[i].stop();
  }
  //reset the exitedTitles variable
  exitedTitles = 0;
}
