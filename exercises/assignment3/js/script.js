"use strict";

/*****************

Raving Redactionist
Pippin Barr

You are redacting a document, but it keeps coming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed!

******************/

// A place to store the jQuery selection of all spans
let $spans;

// A constant to store the total amount of secrets
const NUMBER_OF_SECRETS = 8;

// A variable to count the secrets found
let secretCount = 0;
// A variable to count the number of redacted texts on the screen
let redactedTextCount = 10;

// Variable(s) to store the audio file(s)
let scream;

// When the document is loaded we call the setup function
$(document).ready(setup);


// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  //load the audio file
  scream = new Audio('../assets/sounds/scream.wav');
  // Save the selection of all spans (since we do stuff to them multiple times)
  $spans = $('span');
  // Set a click handler on the spans (so we know when they're clicked)
  $spans.on('click',spanClicked);

  //Set a function that gets called when the mouse hover over a span to check if it's the secretHid span
  $spans.mouseenter(handleSecret);

  // Set an interval of 500 milliseconds to update the state of the page
  setInterval(update,500);

  //Display the word count
  document.getElementById("wordCount").innerHTML = secretCount;
  document.getElementById("wordTotal").innerHTML = NUMBER_OF_SECRETS;
};

// spanClicked()
//
// When a span is clicked we remove its revealed class and add the redacted class
// thus blacking it out
function spanClicked() {
  //The rest only functions when there're still redacted texts on the screen
  if (!redactedTextCount == 0) {
    $(this).removeClass('revealed');
    $(this).addClass('redacted');
    // Add one to the redactedTextCount
    redactedTextCount++;
  }
}

// update()
//
// Update is called every 500 milliseconds and it updates all the spans on the page
// using jQuery's each() function which calls the specified function on _each_ of the
// elements in the selection
function update() {
  $spans.each(updateSpan);
}

// updateSpan()
//
// With a probability of 10% it unblanks the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function updateSpan() {
  //The rest only functions when there're still redacted texts on the screen
  if (!redactedTextCount == 0) {
    let r = Math.random();
    if ($(this).hasClass('redacted')) {
      if (r < 0.1) {
        $(this).removeClass('redacted');
        $(this).addClass('revealed');
        //substract 1 from the redactedTextCount variable
        redactedTextCount--;
        //check if all the redacted texts are revealed
        if(redactedTextCount == 0) {
          //play the sound sfx
          scream.play();
        }
      }
    }
  } else {
    return;
  }

}

// handleSecret()
function handleSecret() {
  //The rest only functions when there're still redacted texts on the screen
  if (!redactedTextCount == 0) {
    //Check if the span selected is the secret span
    if ($(this).hasClass("secretHid")) {
      // Replace the span's secretHid class with secretFound
      $(this).removeClass('secretHid');
      $(this).addClass('secretFound');
      // Add 1 to the secretCount variable
      secretCount++;
      //Display the new secret count
      document.getElementById("wordCount").innerHTML = secretCount;
    }
  }
}
