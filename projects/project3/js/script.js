"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

const NUM_OPTIONS = 3;

//resources = [Wolf's bane, Food, Money, Livestock, Villager, Risk]
let resources = [0,2,2,2,2,0];
let choices = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
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
}

function newRound() {
  $($nextRound).remove();

  //check if there's any event already assigned to this week
  if (events.current.length == 0) {
    //If not, choose a random event
    chooseEvent();
  }

  events.current.assignOptions();
  displayOptions();

  changeWeek();

  $nextRound = $('<div id="nextRound">Next round</div>')
  $('#playground').append($nextRound);
  console.log("NEW ROUND" + week);
  week++;
  $($nextRound).on('click', newRound);
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
    $('#option'+(i+1)).remove();
    options[i].display();
  }
}

function checkAnswer() {
  for (var i = 0; i < 3; i++) {
    //check if it's a mixed option
    if (options[i].mixed.foodMoney == 0) {
      //if not, check every section individually
      if (answer [0] = option[i].wolfsbane) {
        if (answer[1] = options[i].food) {
          if (answer[2] = options[i].money) {
            if (answer[3] = options[i].livestock) {
              if (answer[4] = options[i].villager) {
                if (answer[5] = options[i].risk) {
                  options[i].fulfilled = true;
                }
              }
            }
          }
        }
      }
    }
    //if it's a money-food mixed requirement, check if the total food and money given by player match the requirement
    else if (options[i].mixed.foodMoney !== 0) {
      if (answer[1] + answer[2] == options[i].mixed.foodMoney) {
        if (answer [0] = option[i].wolfsbane) {
          if (answer[3] = options[i].livestock) {
            if (answer[4] = options[i].villager) {
              if (answer[5] = options[i].risk) {
                options[i].fulfilled = true;
              }
            }
          }
        }
      }
    }
  }
}

function finalModification() {
  for (var i = 0; i<6; i++) {

  }
}

function result(choice) {
  for (var i = 0; i<resources.length; i++) {
    resources[i] = resources[i] + choices[choice][i];
  }
  console.log("result " + resources);
}
