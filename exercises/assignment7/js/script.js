"use strict";

/*****************

Music Box
Pippin Barr

A simple example of procedural music generation using Pizzicato's
synthesis and soundfile playing abilities.

******************/

// Time for one note
const NOTE_TEMPO = 500;
// Time for one beat
const DRUM_TEMPO = 250;
// Attack time for a note (in seconds) = fadeIn
const ATTACK = 0.1;
// Release time for a note (in seconds) = fadeOut
const RELEASE = 0.1;
// The length of a sequence during which the synth is played (including the pause)
const SEQUENCE_LENGTH = 8;

// We need an array of the possible notes to play as frequencies (in Hz)
// A Major =  A, B, C♯, D, E, F♯, and G♯
// We can get the frequencies of these notes from THE INTERNET, e.g.
// http://pages.mtu.edu/~suits/notefreqs.html
let frequencies = [
  220,246.94,277.18,293.66,329.63,369.99,415.30
];
// The synth
let synth;
// The sound files
let kick;
let snare;
let hihat;
// Our drum pattern
// Each array element is one beat and has a string with each
// drum to play for that beat
// x = kick, o = snare, * = hihat
let pattern = ['x','o','xo','*','x','x','xo*','o'];
// Which beat of the pattern we're at right now
let patternIndex = 0;

// The distance between the last pause and the current note
let rhythmIndex = 0;

//boolean variable to check if the music is already played
let musicIsPlayed = false;

// setup()
//
// Creat canvas, set up the synth and sound files.
function setup() {
  createCanvas(windowWidth,windowHeight);

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

  // Load the three drum sounds as wav files
  kick = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/kick.wav'
    }
  });

  snare = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/snare.wav'
    }
  });

  hihat = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/hihat.wav'
    }
  });
}

// mousePressed
//
// Using this to start the note and drum sequences to get around
// user interaction (and to give the files time to load)
function mousePressed() {
  //If the music is not already played
  if (!musicIsPlayed) {
    // Start an interval for the notes
    setTimeout(playNote,NOTE_TEMPO*Math.floor(Math.random() * 3+1));
    // Start an interval for the drums
    setInterval(playDrum,DRUM_TEMPO);
    //set the boolean value to true
    musicIsPlayed = true;
  }
}

// playNote
//
// Chooses a random frequency and assigns it to the synth
function playNote() {
  // If it's note already play, play the synth
  //Pause the synth 2 beats before the sequence ends
  if (rhythmIndex >= SEQUENCE_LENGTH-2) {
    synth.pause();
  } else {//Play it normally otherwise
    // Pick a random frequency from the array
    let frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
    // Set the synth's frequency
    synth.frequency = frequency;
    //Add distortion effect for a more 8-bit feel
    var distortion = new Pizzicato.Effects.Distortion({
        gain: 0.2
    });

    synth.addEffect(distortion);
    synth.play();
  }
  //Advance the rhythmIndex by 1 unit
  rhythmIndex = (rhythmIndex + 1) % SEQUENCE_LENGTH;
  //Play another note with different duration
  setTimeout(playNote,NOTE_TEMPO*Math.floor(Math.random() * 3+1));
}

// playDrum()
//
// Checks the string representing the drums for the current beat
// and plays the appropriate sounds
function playDrum() {
  // Get the symbols for the current beat in the pattern
  let symbols = pattern[patternIndex];

  // If there's an 'x' in there, play the kick
  if (symbols.indexOf('x') !== -1) {
    kick.play();
  }
  // If there's an 'o' in there, play the snare
  if (symbols.indexOf('o') !== -1) {
    snare.play();
  }
  // If there's an '*' in there, play the hihat
  if (symbols.indexOf('*') !== -1) {
    hihat.play();
  }
  // Advance the pattern by a beat
  patternIndex = (patternIndex + 1) % pattern.length;
}

// draw()
//
// Nothing right now.

function draw() {
}
