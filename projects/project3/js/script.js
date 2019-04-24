"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

const NUM_OPTIONS = 3;
const NUM_RESOURCES = 6;

//[Wolf's bane, Food, Money, Livestock, Villager, Risk]
let resources = [0,2,2,2,2,0];
let answer = [0,0,0,0,0,0];
let options = [];

let events = {
  last2w: {id: 'none'},
  last1w: {id: 'none'},
  current: {id: 'none'},
  next1w: {id: 'none'},
  next2w: {id: 'none'},
};

let $eventGain;
let $eventLoss;
let $eventTrade;
let $eventSpecial;
let $eventWolfsBane;

let week = 0;

let $nextRound;

let debts = false;
let famine = false;
let desperation = false;
let greed = false;
let attack = false;
let bigWolf = false;

//Setup the program
$(document).ready(setup);

function setup() {
  $('#click-to-begin').on('click', startGame);
}

function startGame() {
  //remove the Click
  $('hgroup').animate({
    opacity: '-=1'
  }, 1000, function() {
    $('hgroup').remove();
  });

  $('.content').css("display", "block");

  $nextRound = $('<div id="nextRound">Next round</div>')
  $('#playground').append($nextRound);
  $nextRound.animate({
    opacity: '+=1'
  },1000);

  $.getJSON('data/events.json', dataLoaded);
}

// dataLoaded()
//
// Execute the program after the data has been loaded
function dataLoaded(data) {

  $eventGain = data.eventGain;
  $eventLoss = data.eventLoss;
  $eventTrade = data.eventTrade;
  $eventSpecial = data.eventSpecial;
  $eventWolfsBane = data.eventWolfsBane;

  newRound();
  displayAnswers();
}

function newRound() {

  //check if the current state of resources call for any special event
  examineSpecialEvent();
  //Update data for the new week's situation
  changeWeek();
  console.log("WEEKCHANGED" + events.current.id);
  //Move the week variable up to 1 unit
  week++;

  //remove the fulfilled class out of the option tags
  for (var i = 0; i<NUM_OPTIONS; i++) {
    $('#option'+i).removeClass("fulfilled");
  }

  //reset answer to 0
  answer = [0,0,0,0,0,0];
  //Display this new answer
  displayAnswers();
  //Display player's current resources
  displayResources();

  //check if there's any event already assigned to this week
  if (events.current.id === 'none') {
    console.log('chose event');
    //If not, choose a random event
    chooseEvent();
  }

  //From the chosen event, set up corresponding options for the player
  events.current.assignOptions();
  //Display these options
  displayOptions();
  //Display the new title
  $('.eventTitle').remove();
  $('.content').append("<h2 class='eventTitle'>"+events.current.title+"</h2>");
  //check if there is already an available option
  checkAnswer();

  //Trigger if player clicks on an option
  $('.option').off().on('click', optionChosen);

  //Trigger if player clicks on a type of resource
  $('.resource').off().on('click', answerChosen);

  //Trigger if player clicks on a type of answer
  $('.answer').off().on('click', answerModify);

  //FOR TESTING ONLY!!!! move to the next round if "next round" is clicked
  $($nextRound).off().on('click', newRound);

}

function answerChosen() {
  if ($(this).attr("id") == "resource0") {
    if (answer[0] < resources[0]) {
      answer[0]++;
    }
  } else if ($(this).attr("id") == "resource1") {
    if (answer[1] < resources[1]) {
      answer[1]++;
    }
  } else if ($(this).attr("id") == "resource2") {
    if (answer[2] < resources[2]) {
      answer[2]++;
    }
  } else if ($(this).attr("id") == "resource3") {
    if (answer[3] < resources[3]) {
      answer[3]++;
    }
  } else if ($(this).attr("id") == "resource4") {
    if (answer[4] < resources[4]) {
      answer[4]++;
    }
  } else if ($(this).attr("id") == "resource5") {
    if (answer[5] < resources[5]) {
      answer[5]++;
    }
  }
  displayAnswers();
  checkAnswer();
}

function optionChosen() {
  if ($(this).attr('id') == "option0"){
    if ($(this).hasClass("fulfilled")) {
      options[0].checkforSpecial();
      options[0].updateResource();
      newRound();
    }
  } else if ($(this).attr('id') == "option1") {
    if($(this).hasClass("fulfilled")) {
      options[1].checkforSpecial();
      options[1].updateResource();
      newRound();
    }
  } else if ($(this).attr('id') == "option2") {
    if($(this).hasClass("fulfilled")) {
      options[2].checkforSpecial();
      options[2].updateResource();
      newRound();
    }
  }
}

function answerModify() {
  for (var i = 0; i<NUM_RESOURCES; i++) {
    if ($(this).attr('id') == "answer"+i) {
      //limit the answer's value between 0 and 15 (the maximum amount of cards)
      answer[i] = range(answer[i]-1, 0, 15);
    }
  }
  //check answers again to remove a fulfilled status if the new answer no longer correspond to its requirements
  checkAnswer();
  //display the new answers
  displayAnswers();
}

function displayResources() {
  for (var i = 0; i<NUM_RESOURCES; i++) {
    $('#resource'+i).remove();
    let resourceNames = ["Wolf's bane", "Food", "Money", "Livestock", "Villager", "Risk"]
    let $content = $('<div class="resource" id="resource'+i+'">'+resourceNames[i]+': '+resources[i]+'</div>')
    $('.resources').append($content);
  }
}

function displayAnswers() {
  for (var i = 0; i<NUM_RESOURCES; i++) {
    $('#answerContent'+i).remove();
    let $content = $('<div id="answerContent'+i+'">'+answer[i]+'</div>');
    $('#answer'+i).append($content);
  }
}

function chooseEvent() {
  eventRandomizer();
  if (events.last2w.id == events.current.id || events.last1w.id == events.current.id) {
    //repeat the process
    eventRandomizer();
  }
}

function eventRandomizer() {
  var r = Math.random();
  var currentCard;
  if (r <= 0.15) {
    //Open wolf's bane event
    currentCard = $eventWolfsBane[0];
  } else if (r <= 0.35) {
    //Open a Loss event
    currentCard = $eventLoss[Math.floor(Math.random() * $eventLoss.length)];
  } else if (r <= 0.75) {
    //Open a Gain event
    currentCard = $eventGain[Math.floor(Math.random() * $eventGain.length)];
  } else if (r <= 1) {
    //Open a Trade event
    currentCard = $eventTrade[Math.floor(Math.random() * $eventTrade.length)];
  }
  events.current = new Event(currentCard.id, currentCard.title, currentCard.description, currentCard.options)
}

function examineSpecialEvent() {
  let $newEvent = {id: 'none'};
  //trigger famine card if there's no food
  if (resources[1] == 0) {
    $newEvent = $eventSpecial[3];
  }
  //trigger cross-town marriage if there's only 1 villager
  else if (resources[4] == 1) {
    $newEvent = $eventSpecial[0];
  }
  //trigger wolf attack if there's more than 4 risk
  else if (resources[5] >= 5) {
    $newEvent = $eventSpecial[2]
  }
  //trigger greed if the total number of resources is >15
  else if (resources[0] + resources[1] + resources[2] + resources[3] + resources[4] + resources[5] > 15) {
    $newEvent = $eventSpecial[4];
  }
  //trigger desperation if the total amount of resources is <4
  else if (resources[0] + resources[1] + resources[2] + resources[3] + resources[4] + resources[5] < 4) {
    $newEvent = $eventSpecial[5];
  }
  //trigger wolf's bane when 29 weeks have passed
  else if (week%29 == 0 && week>0) {
    $newEvent = $eventWolfsBane[0];
  }
  //trigger BIG WOLF when 30 weeks have passed
  else if (week%30 == 0 && week>0) {
    $newEvent = $eventSpecial[6];
  }

  //if a special event is called for, insert it into next week's event
  if ($newEvent.id !== 'none') {
    events.next1w = new Event($newEvent.id, $newEvent.title, $newEvent.description, $newEvent.options);
  }
}

function changeWeek() {
  events.last2w = events.last1w;
  events.last1w = events.current;
  events.current = events.next1w;
  events.next1w = events.next2w;
  events.next2w = {id: 'none'};

  console.log("events: "+ events);
}

//displayOptions()
//
//display the options corresponding to the current event
function displayOptions() {
  for (var i = 0; i<NUM_OPTIONS; i++) {
    //remove the old content
    $('#optionContent'+i).remove();
    //add the new content
    options[i].display(i);
  }
}

//checkAnswer()
//
//check if the answer has fulfilled any option
function checkAnswer() {
  for (var i = 0; i < 3; i++) {
    //remove the old stats
    $('#option'+i).removeClass('fulfilled');
    options[i].fulfilled = false;
    //use Option's checkOption() to determine if this option has been fulfilled
    options[i].checkOption();
    if (options[i].fulfilled == true) {
      //add the fulfilled class to the corresponding HTML element
      $('#option'+i).addClass('fulfilled');
    }
  }
}

function gameOver(cond) {
  $(".content").remove();
  $nextRound.remove();
  if (cond === "won") {
    $("#playground").append("<div class='result'>You win</div>");
  }
  else if (cond === "lost") {
    $("#playground").append("<div class='result'>You lose</div>");
  }
  else {
    return false;
  }
}

//range()
//
//limit a value between a range
function range(val, min, max) {
    return Math.min(Math.max(val, min), max);
}
