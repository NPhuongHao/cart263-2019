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
  last2w: [],
  last1w: [],
  current: [],
  next1w: [],
  next2w: [],
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

let gameOver = false;
let gameWon = false;


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
  $($nextRound).remove();

  answer = [0,0,0,0,0,0];
  displayAnswers();

  //check if there's any event already assigned to this week
  if (events.current.length == 0) {
    //If not, choose a random event
    chooseEvent();
  }

  displayResources();

  events.current.assignOptions();
  displayOptions();

  $('.resource').on('click', answerChosen);

  changeWeek();

  $nextRound = $('<div id="nextRound">Next round</div>')
  $('.content').append($nextRound);
  console.log("NEW ROUND" + week);
  week++;
  $($nextRound).on('click', newRound);
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
    $('#answer'+i).remove();
    let $content = $('<div class="answer" id="answer'+i+'">'+answer[i]+'</div>');
    $('.answers').append($content);
  }
}


function chooseEvent() {
  eventRandomizer();
  while (events.last2w == events.current || events.last1w == events.current) {
    //repeat the process
    eventRandomizer();
  }
  console.log(events.current.id);
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

function changeWeek() {
  events.last2w = events.last1w;
  events.last1w = events.current;
  events.current = events.next1w;
  events.next1w = events.next2w;
}


function displayOptions() {
  for (var i = 0; i<NUM_OPTIONS; i++) {
    $('#option'+i).remove();
    options[i].display();
  }
}

function checkAnswer() {
  for (var i = 0; i < 3; i++) {
    options[i].checkOption();
    if (options[i].fulfilled == true) {
      $('#option'+i).addClass('fulfilled');
      displayOptions();
    }
  }
}

function finalModification() {
  for (var i = 0; i<NUM_RESOURCES; i++) {
    let rewardIndex = [rewards.wolfsbane, rewards.food, rewards.money, rewards.livestock, rewards.villager, rewards.risk];
    resources[i] = resources[i] - answer[i] + rewardIndex[i];
  }
  console.log("resources = " + resources);
}

function result(choice) {
  for (var i = 0; i<NUM_RESOURCES; i++) {
    resources[i] = resources[i] + choices[choice][i];
  }
  console.log("result " + resources);
}
