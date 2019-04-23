"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

//resources = [Wolf's bane, Food, Money, Livestock, Villager, Risk]
let resources = [0,2,2,2,2,0];
let resourceActions = [0,0,0,0,0,0];
let choices = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];

let eventOfWeek;
let eventLastWeek;
let eventLastTwoWeek;

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
  $('body').append($nextRound);
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

  // chooseEvent();
  // executeEvent(eventOfWeek);
  // result(0);

  $nextRound = $('<div id="nextRound">Next round</div>')
  $('body').append($nextRound);
  console.log("NEW ROUND" + week);
  week++;
  $($nextRound).on('click', newRound);
}



function chooseEvent() {
  var r = Math.random();
  if (r <= 0.15) {
    //Open wolf's bane card
    eventOfWeek = wolfsbane;
  } else if (r <= 0.35) {
    eventOfWeek = eventLoss[Math.floor(Math.random() * eventLoss.length)];
  } else if (r <= 0.75) {
    eventOfWeek = eventGain[Math.floor(Math.random() * eventGain.length)];
  } else if (r <= 1) {
    eventOfWeek = eventTrade[Math.floor(Math.random() * eventTrade.length)];
  }
  while (eventLastTwoWeek == eventOfWeek || eventLastWeek == eventOfWeek) {
    //repeat the process
    if (r <= 0.15) {
      eventOfWeek = wolfsbane;
    } else if (r <= 0.35) {
      eventOfWeek = eventLoss[Math.floor(Math.random() * eventLoss.length)];
    } else if (r <= 0.75) {
      eventOfWeek = eventGain[Math.floor(Math.random() * eventGain.length)];
    } else if (r <= 1) {
      eventOfWeek = eventTrade[Math.floor(Math.random() * eventTrade.length)];
    }
  }
  eventLastTwoWeek = eventLastWeek;
  eventLastWeek = eventOfWeek;
  console.log(eventOfWeek);
}

function executeEvent(x) {
//[Wolf's bane, Food, Money, Livestock, Villager, Risk]
//     0          1     2        3         4        5
  if (x === "good week") {
    //+2 money
    choices[0][2] = 2;
    //+2 food
    choices[1][1] = 2;
    //+2 Livestock
    choices[2][3] = 2;
  }
  if (x === "collect") {
    //+1 Money
    choices[0][2] = 2;
    //+1 food
    choices[1][1] = 2;
  }
  if (x === "harvest") {
    //+3 Food
    choices[0][1] = 3;
    //+1 Food
    choices[1][1] = 1;
  }
  if (x === "breeding") {
    //+ 2 livestock
    choices[0][3] = 2;
    //+ 1 livestock + 1 money
    choices[1][3] = 1;
    choices[1][2] = 1;
    //+ 2 money
    choices[2][2] = 1;
  }
  if (x === "generous merchant") {
    //- 1 food + 2 money
    choices[0][1] = -1;
    choices[0][2] = 2;
    //- 1 money + 2 food
    choices[1][1] = 2;
    choices[1][2] = -1;
  }
  if (x === "difficult merchant") {
    //- 2 food + 1 money
    choices[0][1] = -2;
    choices[0][2] = 1;
    //- 2 money + 1 food
    choices[1][1] = 1;
    choices[1][2] = -2;
  }
  if (x === "witch") {
    //- 1 livestock – 1 money + 2 livestock
    choices[0][3] = -1;
    choices[0][2] = -1;
    choices[0][3] = 2;
    //- 1 food – 1 money + 2 food
    choices[0][1] = -1;
    choices[0][2] = -1;
    choices[0][1] = 2;
  }
  if (x === "farmer") {
    //- 2 money + 2 livestock
    choices[0][2] = -2;
    choices[0][3] = 2;
    //- 1 money + 1 livestock
    choices[1][1] = -1;
    choices[1][3] = 1;
  }
  if (x === "local marriage") {
    //- 2 food/-2 money + 1 villager + 1 livestock
    if (answer[1] == 2 && answer[2] == 0) {
      choices[0][1] = -2;
    } else if (answer[2] == 2 && answer[1] ==0) {
      choices[0][2] = -2;
    } else if (answer[2] == 1 && answer[1] == 1) {
      choices[0][1] = -1;
      choices[0][2] = -1;
    }
    choices[0][4] = 1;
    choices[0][3] = 1;
    //- 1 food
    choices[1][1] = -1;
  }
  if (x === "lost wolfie") {
    //– 0 to 1 risk
    if (resources[5] > 0) {
      choices[0][5] = -1;
    }
    //+ 1 livestock + 1 risk
    choices[1][3] = 1;
    choices[1][5] = 1;
    //+ 1 food + 1 risk
    choices[2][1] = 1;
    choices[2][5] = 1;
  }
  if (x === "call to arms") {
    //- 2 money
    if (resources[2] > 2) {
      choices[0][2] = -2;
    } else {
      choices[0][2] = resources[2];
    }
    //-2 Food
    if (resources[1] > 2) {
      choices[0][1] = -2;
    } else {
      choices[0][1] = resources[1];
    }
    //-2 villagers
    if (resources[4] > 2) {
      choices[0][4] = -2;
    } else {
      choices[0][4] = resources[4];
    }

  }
  if (x === "wolf's demands") {
    //-2 Livestock
    choices[0][3] = -2;
    //-1 villager
    choices[1][4] = -1;
    //+1 risk + "Debts for the Wolf"
    choices[0][5] = 1;
    debts = true;
  }
  if (x === "cross-town marriage") {
    //- 2 food + 1 villager
    choices[0][1] = -2;
    choices[0][4] = 1;
    //- 1 food
    choices[1][1] = -1;
    //- 1 villager
    choices[1][4] = -1;
  }
  if (x === "infestation") {
    //- ½ to 2/3 food
    choices[0][1] = Math.floor(2/3*resources[1]);
    //- 1 food – 1 money
    choices[1][1] = -1;
    choices[0][2] = -1;
    //- ½ to 2/3 villagers – 1/3 livestock
    choices[2][4] = Math.floor(2/3*resources[4]);
    choices[2][3] = Math.floor(1/3*resources[3]);
  }
  if (x === "wolf's debts") {
    //- 3 livestock – 0 to 1 risk
    choices[0][3] = -3;
    if (resources[5] > 0) {
      choices[0][5] = -1;
    }
    //- 2 villager – 0 to 1 risk
    choices[1][4] = -2;
    if (resources[5] > 0) {
      choices[1][5] = -1;
    }
    //+ 2 risk
    choices[2][5] = 2;
  }
  if (x === "wolf attack") {
    //- 0 to 3 livestock – 3 risk
    choices[0][3] = -3;
    choices[0][5] = -3;
    //- 2 villager – 3 risk
    choices[1][4] = -2;
    choices[1][5] = -3;
    //"Game over"
    gameOver = true;
  }
  if (x === "famine") {
    //- 2/3 livestock + 2 food
    if (resources[3] < 2) {
      choices[0][3] = -1;
    } else {
      choices[0][3] = -Math.floor(2/3*resources[3]);
    }
    choices[0][1] = 2;
    //- 2/3 villager + 2 food
    choices[1][4] = -Math.floor(2/3*resources[4]);
    choices[1][1] = 2;
    //- 3 money + 2 food
    choices[2][2] = -3;
    choices[2][1] = 2;
  }
  if (x === "greed") {
    //- 2 livestock – 2 villager – 1 food
    choices[0][3] = -2;
    choices[0][4] = -2;
    choices[0][1] = -1;
    //Lose 5 cards randomly
    var i = 0;
    while (i<6) {
      var cardChosen = Math.floor(Math.random()*resources.length);
      if (resources[cardChosen] > 0) {
        choices[2][cardChosen] = -1;
        i++;
      }
    }
  }
  if (x === "desperation") {
    //+ 1 food + 1 livestock + 1 villager + 1 money
    choices[0][1] = 1;
    choices[0][2] = 1;
    choices[0][3] = 1;
    choices[0][4] = 1;
    //+ 2 food + 2 livestock + 2 villager + 2 money + 1 risk + “Debts for the Wolf” (The Wolf’s help is hardly legal)
    choices[1][1] = 2;
    choices[1][2] = 2;
    choices[1][3] = 2;
    choices[1][4] = 2;
    choices[1][5] = 1;
    debts = true;
  }
  if (x === "BIG WOLF") {
    //- 3 Livestock/ 3 villager - 1 wolf’s bane + "Game win"
    if (answer[0] == 1) {
      if (answer[3] == 3 && answer[4] == 0) {
        choices[0][3] = -answer[3];
      } else if ((answer[3] == 2 & answer[4] == 1) || (answer[3] == 1 & answer[4] == 2)) {
        choices[0][3] = -answer[3];
        choices[0][4] = -answer[4];
      } else if (answer[3] == 0 && answer[4] == 3) {
        choices[0][4] = -answer[4];
      }
    }
    choices[0][0] = -1;
    gameWon = true;
    //- 3 villager/ - 3 villager + "continue"
    if (answer[3] == 3 && answer[4] == 0) {
      choices[1][3] = -answer[3];
    } else if ((answer[3] == 2 & answer[4] == 1) || (answer[3] == 1 & answer[4] == 2)) {
      choices[1][3] = -answer[3];
      choices[1][4] = -answer[4];
    } else if (answer[3] == 0 && answer[4] == 3) {
      choices[1][4] = -answer[4];
    }
    //+ 2 risk + “Debts for the Wolf” + "continue"
    choices[2][5] = 2
    debts = true;
  }
  if (x === "wolf's bane") {
    //- 5 money + 1 wolf’s bane
    choices[0][2] = -5;
    choices[0][0] = 1;
    //+ 4 risk + 1 wolf’s bane
    choices[1][5] = 4;
    choices[1][0] = 1;
  }
  console.log("choice1 " + choices[0]);
}

function result(choice) {
  for (var i = 0; i<resources.length; i++) {
    resources[i] = resources[i] + choices[choice][i];
  }
  console.log("result " + resources);
}
