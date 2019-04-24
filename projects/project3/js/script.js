"use strict";

/*****************

  MAYORING
  Nguyen Phuong Hao

  A card game based on the gameplay of Spoopy Squad's Underhand.
  In this game, you play as the mayor of a small village near the forest. Pressured by wars and the wolfs nearby,
the mayor signed a contract with the Big Wolf, in order to minimize the damage.
  Manage your resources and survive through the weeks, and maybe you'll be able to break the contract!

******************/

//The amount of available options
const NUM_OPTIONS = 3;
//The total amount of types of resources
const NUM_RESOURCES = 6;

//Resource list
//[Wolf's bane, Food, Money, Livestock, Villager, Risk]
let resources = [0,2,2,2,2,0];
let answer = [0,0,0,0,0,0];
let currentOptions = [];

//Array to store future special event and to avoid repetition
let events = {
  last2w: {id: 'none'},
  last1w: {id: 'none'},
  current: {id: 'none'},
  next1w: {id: 'none'},
  next2w: {id: 'none'},
};

//variables to store each type of events
let $eventGain;
let $eventLoss;
let $eventTrade;
let $eventSpecial;
let $eventWolfsBane;

//variable to count the week/round
let week = 0;

//FOR TEST ONLY
let $nextRound;


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

  //reveal the game's content
  $('.content').css("display", "block");

  //FOR TEST
  $nextRound = $('<div id="nextRound">Next round</div>')
  $('#playground').append($nextRound);
  $nextRound.animate({
    opacity: '+=1'
  },1000);

  //Load the events' data
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

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

//
//MECHANICS EXPLAINED
//
//
//1. Choose the week's event (can be a special event or a random event)
//2. Set up 3 options corresponding to the current event
//3. In each option, set up a set of requirements (can change according to the resources) and rewards
//4. Player choose to give away a set of answer from their resources
//5. If the answer corresponds to an option's requirements, the option is tagged fulfilled
//6. If the player clicks on a fulfilled option, resources will change accordingly.
//7. Depending on the player's current resources and last option, a special event can be triggered
//8. If after a cycle of 30 rounds, the player can kill the Big Wolf, then the player wins the game.
//9. If player is forced to choose a "game lost" option, the player loses the game.

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

//newRound()
//
//call a new round
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


//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------


//answerChosen
//
//Modify the answer according to player's action
function answerChosen() {
  //if player clicks on the wolfsbane resource
  if ($(this).attr("id") == "resource0") {
    //if this resource is > 0
    if (answer[0] < resources[0]) {
      //add 1 unit to the corresponding answer
      answer[0]++;
    }
  }
  //if player clicks on the food resource
  else if ($(this).attr("id") == "resource1") {
    if (answer[1] < resources[1]) {
      answer[1]++;
    }
  }
  //if player clicks on the money resource
  else if ($(this).attr("id") == "resource2") {
    if (answer[2] < resources[2]) {
      answer[2]++;
    }
  }
  //if player clicks on the livestock resource
  else if ($(this).attr("id") == "resource3") {
    if (answer[3] < resources[3]) {
      answer[3]++;
    }
  }
  //if player clicks on the villager resource
  else if ($(this).attr("id") == "resource4") {
    if (answer[4] < resources[4]) {
      answer[4]++;
    }
  }
  //if player clicks on the risk resource
  else if ($(this).attr("id") == "resource5") {
    if (answer[5] < resources[5]) {
      answer[5]++;
    }
  }
  displayAnswers();
  checkAnswer();
}

//answerChosen
//
//Take action according to player's decision
function optionChosen() {
  for (var i=0; i<NUM_OPTIONS; i++) {
    //if player choses the i option
    if ($(this).attr('id') == "option"+i){
      if ($(this).hasClass("fulfilled")) {
        //check if this option triggers any special event
        options[i].checkforSpecial();
        //update the resources accordingly
        options[i].updateResource();
        //call for a new round
        newRound();
      }
    }
  }
}

//answerModify
//
//Modify the player's answer if they click on an answer element
function answerModify() {
  for (var i = 0; i<NUM_RESOURCES; i++) {
    if ($(this).attr('id') == "answer"+i) {
      //limit the answer's value between 0 and 15 (the maximum amount of cards)
      //Reduce 1 unit from the corresponding answer
      answer[i] = range(answer[i]-1, 0, 15);
    }
  }
  //check answers again to remove a fulfilled status if the new answer no longer correspond to its requirements
  checkAnswer();
  //display the new answers
  displayAnswers();
}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

//displayResources()
//
function displayResources() {
  //variables to store the resources' name
  let resourceNames = ["Wolf's bane", "Food", "Money", "Livestock", "Villager", "Risk"]
  for (var i = 0; i<NUM_RESOURCES; i++) {
    //Remove the old resource status
    $('#resource'+i).remove();
    //append the corresponding element into the resources HTML element
    let $content = $('<div class="resource" id="resource'+i+'">'+resourceNames[i]+': '+resources[i]+'</div>')
    $('.resources').append($content);
  }
}

//displayOptions()
//
//display the options corresponding to the current event
function displayOptions() {
  for (var i = 0; i<NUM_OPTIONS; i++) {
    //remove the old content
    $('#optionContent'+i).remove();
    //add the new content
    currentOptions[i].display(i);
  }
}

//displayAnswers()
//
function displayAnswers() {
  for (var i = 0; i<NUM_RESOURCES; i++) {
    $('#answerContent'+i).remove();
    let $content = $('<div id="answerContent'+i+'">'+answer[i]+'</div>');
    $('#answer'+i).append($content);
  }
}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

//chooseEvent()
//
//Run the event randomizer
//If the answer received is similar to the last two events, repeat the process
function chooseEvent() {
  eventRandomizer();
  if (events.last2w.id == events.current.id || events.last1w.id == events.current.id) {
    //repeat the process
    eventRandomizer();
  }
}

//eventRandomizer()
//
//Randomize the current event
function eventRandomizer() {
  var r = Math.random();
  var currentCard;
  if (r <= 0.05) {
    //Open wolf's bane event
    currentCard = $eventWolfsBane[0];
  } else if (r <= 0.30) {
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

//examineSpecialEvent()
//
//check if the current resources status calls for any special event
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

//changeWeek()
//
//Update the new week's records
function changeWeek() {
  events.last2w = events.last1w;
  events.last1w = events.current;
  events.current = events.next1w;
  events.next1w = events.next2w;
  events.next2w = {id: 'none'};

  console.log("events: "+ events);
}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

//checkAnswer()
//
//check if the answer has fulfilled any option
function checkAnswer() {
  for (var i = 0; i < 3; i++) {
    //remove the old stats
    $('#option'+i).removeClass('fulfilled');
    currentOptions[i].fulfilled = false;
    //use Option's checkOption() to determine if this option has been fulfilled
    currentOptions[i].checkOption();
    if (currentOptions[i].fulfilled == true) {
      //add the fulfilled class to the corresponding HTML element
      $('#option'+i).addClass('fulfilled');
    }
  }
}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

//gameOver()
//
//How the game reacts when the game is over
function gameOver(cond) {
  //remove the content
  $(".content").remove();
  //FORTEST
  $nextRound.remove();
  //If the game is won
  if (cond === "won") {
    $("#playground").append("<div class='result'>You win</div>");
  }
  //If the game is lost
  else if (cond === "lost") {
    $("#playground").append("<div class='result'>You lose</div>");
  }
}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------


//range()
//
//limit a value between a range
function range(val, min, max) {
    return Math.min(Math.max(val, min), max);
}
