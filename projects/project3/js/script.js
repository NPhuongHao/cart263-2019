"use strict";

/*****************

  MAYORING
  Nguyen Phuong Hao

  A card game based on the gameplay of Spoopy Squad's Underhand.
  In this game, you play as the mayor of a small village near the forest. Pressured by wars and the wolfs nearby,
the mayor signed a contract with the Big Wolf, in order to minimize the damage.
  Manage your resources and survive through the weeks, and maybe you'll be able to break the contract!

  BGM: 'Oh Grey Wardens' from Dragon Age: Inquisition,
    Music and Lyrics by Raney Shockne
    Guitar: Nick Stoubis
    Bioware, EA

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

//variable to store BGM
let bgm;

//FOR ending BGM
//
//check if the music is played
let musicIsPlayed = false;
// Time for one note
const NOTE_TEMPO = 500
// Attack time for a note (in seconds) = fadeIn
const ATTACK = 0.1;
// Release time for a note (in seconds) = fadeOut
const RELEASE = 0.1;
// The length of a sequence during which the synth is played (including the pause)
const SEQUENCE_LENGTH = 8;
// We need an array of the possible notes to play as frequencies (in Hz)
// C Major = C, D, E, F, G, A, and B.
// We can get the frequencies of these notes from THE INTERNET, e.g.
// http://pages.mtu.edu/~suits/notefreqs.html
let frequencies = [
  261.63,293.66,329.63,349.23,392.00,440.00,493.88,523.25,587.33,659.25,698.46,783.99,880.00,987.77
];
let melody = [
  "A4x", "B4", "C5", "B4x", "o", "o", "A4x", "B4", "C5", "B4", "o", "o", "C5", "D5", "E5x", "F5", "E5",
  "D5", "B4", "G4", "A4", "C5", "B4", "A4x", "o", "o", "A4x", "B4", "C5", "B4x", "o", "o", "C5x", "D5",
  "C5", "B4", "o", "o", "C5y", "D5y", "E5y", "F5y", "E5y", "D5y", "E5y", "C5y", "D5", "B4", "G4", "A4",
  "C5", "B4", "A4x", "o", "o"
];
// The synth
let synth;
// The distance between the last pause and the current note
let rhythmIndex = 0;
let melodyIndex = 0;


//Setup the program
$(document).ready(setup);

function setup() {

  //BGM
  bgm = new Audio('./assets/sounds/BGM.mp3');

  //click to start game
  $('#click-to-begin').on('click', startGame);

  //Ending BGM
  // Create the synth
  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sine',
      attack: ATTACK,
      release: RELEASE,
      frequency: 220
    }
  });
}


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

  //reveal the game's content
  $('.content').css("display", "block");
  $('.content').animate({
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
  console.log("round " + week);

  //Update data for the new week's situation
  changeWeek();
  //Move the week variable up to 1 unit
  week++;
  //reset answer to 0
  answer = [0,0,0,0,0,0];
  //Display this new answer
  displayAnswers();
  //Display player's current resources
  displayResources();

  //remove the fulfilled class out of the option tags
  for (var i = 0; i<NUM_OPTIONS; i++) {
    $('#option'+i).removeClass("fulfilled");
  }

  //check if there's any event already assigned to this week
  if (events.current.id === 'none') {
    //If not, choose a random event
    chooseEvent();
  }

  //From the chosen event, set up corresponding options for the player
  events.current.assignOptions();
  //Display these options
  displayOptions();
  //Display the new title
  $('.eventTitle').remove();
  $('.eventSubtitle').remove();
  $('.content').append("<h2 class='eventTitle'>"+events.current.title+"</h2>");
  $('.content').append("<h3 class='eventSubtitle'>"+events.current.description+"</h2>");
  //Display the week count
  $('#week').remove();
  $('.week').append("<p id = 'week'>Week: "+week+"</p>");
  //Display the total amount of cards
  let totalCards = resources[0]+resources[1]+resources[2]+resources[3]+resources[4]+resources[5];
  $('#cards').remove();
  $('.content').append('<p id = "cards">Cards: '+totalCards+'</p>');
  //apply effects
  $( ".eventTitle" ).effect( "slide", "slow", 500);
  $( ".eventSubtitle" ).effect( "slide", "slow", 500);
  //check if there is already an available option
  checkAnswer();

  //Trigger if player clicks on an option
  $('.option').off().on('click', optionChosen);

  //Trigger if player clicks on a type of resource
  $('.resource').off().on('click', answerChosen);

  //Trigger if player clicks on a type of answer
  $('.answer').off().on('click', answerModify);

  //display instruction on alert if help is clicked on
  $('.help').off().on('click', function() {
    alert("1. Click on a resource (last row buttons) to add one unit on the deck. || 2. Click on the corresponding place in the deck to return one unit.  || 3. Click on an option in red to complete a round.");
  });
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
  checkAnswer();
  displayAnswers();

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
        currentOptions[i].checkforSpecial();
        //update the resources accordingly
        currentOptions[i].updateResource();
        //check if the current state of resources call for any special event
        examineSpecialEvent();
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
  for (var i = 0; i<NUM_RESOURCES; i++) {
    //Remove the old resource status
    $('#resource'+i).remove();
    //append the corresponding element into the resources HTML element
    let $content = $('<div class="resource" id="resource'+i+'">'+resources[i]+'</div>')
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
  console.log("check special")
  let $newEvent = {id: 'none'};
  //trigger famine card if there's no food
  if (resources[1] == 0) {
    console.log("famine");
    $newEvent = $eventSpecial[3];
  }
  //trigger cross-town marriage if there's only 1 villager
  else if (resources[4] == 1) {
    $newEvent = $eventSpecial[0];
    console.log("marriage");
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
  //update the option's currentstatus
  updateStatus();
}

function updateStatus() {
  //Update options
  for (var i=0; i<NUM_OPTIONS; i++) {
    if ($('#option'+i).hasClass('fulfilled')) {
      $( "#option"+i ).animate({
          backgroundColor: "#aa0000",
          color: "#fff",
        }, 1000 );
    } else {
      $( "#option"+i ).animate({
          backgroundColor: "#000",
          color: "#fff",
        }, 1000 );
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
  //If the game is won
  if (cond === "won") {
    $("#playground").append("<div class='result'>You win</div>");
  }
  //If the game is lost
  else if (cond === "lost") {
    $("#playground").append("<div class='result'>You lose</div>");
  }

  //stop the bgm and play the ending bgm
  bgm.pause();
  //ending bgm
  if (!musicIsPlayed) {
    // Start an interval for the notes
    setTimeout(playNote,NOTE_TEMPO);
    //set the boolean value to true
    musicIsPlayed = true;
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

// playNote
//
// Chooses a random frequency and assigns it to the synth
function playNote() {
  let symbols = melody[melodyIndex];
  let noteDuration = NOTE_TEMPO;
  let frequency;
  if (symbols.indexOf("o") !== -1) {
    synth.pause();
  } else {
    if (symbols.indexOf("C4") !== -1) {
      frequency = frequencies[0];
    } if (symbols.indexOf("D4") !== -1) {
      frequency = frequencies[1];
    } if (symbols.indexOf("E4") !== -1) {
      frequency = frequencies[2];
    } if (symbols.indexOf("F4") !== -1) {
      frequency = frequencies[3];
    } if (symbols.indexOf("G4") !== -1) {
      frequency = frequencies[4];
    } if (symbols.indexOf("A4") !== -1) {
      frequency = frequencies[5];
    } if (symbols.indexOf("B4") !== -1) {
      frequency = frequencies[6];
    } if (symbols.indexOf("C5") !== -1) {
      frequency = frequencies[7];
    } if (symbols.indexOf("D5") !== -1) {
      frequency = frequencies[8];
    } if (symbols.indexOf("E5") !== -1) {
      frequency = frequencies[9];
    } if (symbols.indexOf("F5") !== -1) {
      frequency = frequencies[10];
    } if (symbols.indexOf("G5") !== -1) {
      frequency = frequencies[11];
    } if (symbols.indexOf("A5") !== -1) {
      frequency = frequencies[12];
    } if (symbols.indexOf("B5") !== -1) {
      frequency = frequencies[13];
    }
    if (symbols.indexOf("x") !== -1) {
      noteDuration = NOTE_TEMPO*1.5;
    } if (symbols.indexOf("y") !== -1) {
      noteDuration = NOTE_TEMPO*0.5;
    }
    // Set the synth's frequency
    synth.frequency = frequency;
    synth.play();
  }


  //Advance the rhythmIndex by 1 unit
  rhythmIndex = (rhythmIndex + 1) % SEQUENCE_LENGTH;
  melodyIndex = (melodyIndex + 1) % melody.length;
  //Play another note with different duration
  setTimeout(playNote,noteDuration);
}
