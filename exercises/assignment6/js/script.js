/*

Condiments
Pippin Barr

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

RiTA
http://rednoise.org/rita/index.html

*/

let vowels = ['a','i','u','e','o'];
let character;
let condiment;
let cat;
let room;

$(document).ready(function() {

  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON('data/character.json', function(data) {
    // Get a random character element from the characters array in the character JSON
    character = getRandomElement(data.characters).name;
  });
  $.getJSON('data/data.json', gotData);
});

// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {
  // Now we select random elements from the three arrays inside
  // our JSON to get a random condiment, cat, and room. Then we add those
  // words onto our page by setting the text of the appropriate span.

  // First the condiment
  // Get a random condiment from the condiments array in the JSON
  condiment = getRandomElement(data.condiments);
  // Assume it's singular
  let verb = 'is';
  // Check if the last latter of the condiment is an 's'
  if (condiment.charAt(condiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
  }

  // Now the cat
  cat = getRandomElement(data.cats);
  // Same again for room
  room = getRandomElement(data.rooms);

  // Assume these nouns start with a consonant
  // Article for the cat
  let article = "a";
  // Article for the room
  let article2 = "a";
  //Check with every elements in the vowels array
  for (var i=0; i<vowels.length; i++) {
    // Check if the first letter of the cat is a vowel
    if (cat.charAt(0) === vowels[i]) {
      //If so, change its article into "an"
      article = "an";
    }
    // Check if the first letter of the room is a vowel
    if (room.charAt(0) === vowels[i]) {
      //If so, change its article into "an"
      article2 = "an";
    }
  }

  $(document).click(function() {
    location.reload();
  })


  // Now we can construct our description with a template string
  // We have the basic structure of a sentence and we substitute in the
  // values we've just calculated
  let description = `${condiment} ${verb} like a ${cat} in a ${room} full of ${character}s.`;

  // Finally, we add it to the page and hey presto!
  $('body').append(description)


}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
