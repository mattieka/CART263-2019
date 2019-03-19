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

let vowels = "aeiou";

$(document).ready(function() {

  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
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
  let condiment = getRandomElement(data.condiments);
  // Assume it's singular
  let verb = 'is';
  // Check if the last latter of the condiment is an 's'
  if (condiment.charAt(condiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
  }


  // Now the cat
  let cat = getRandomElement(data.cats);

  // Same again for room
  let room = getRandomElement(data.rooms);
  let roomArticle = "a"
  let roomFirstCharacter = room.charAt(0);
  if (vowels.indexOf(roomFirstCharacter) !== -1) {
    roomArticle = "an";
  }
  // get a random emoji
  let emoji = getRandomElement(data.emoji);

  // get a random fabric/materal
  let fabric = getRandomElement(data.technicalfabrics);
  let fabricArticle = "a"
  let fabricFirstCharacter = fabric.charAt(0);
  if (vowels.indexOf(fabricFirstCharacter) !== -1) {
    fabricArticle = "an";
  }

  // get random clothing element
  let clothes = getRandomElement(data.clothes);
  if (clothes.charAt(clothes.length - 1) === "s" && clothes.charAt(clothes.length - 2) !== "s") {
    fabricArticle = "";
  }

  // Now we can construct our description with a template string
  // We have the basic structure of a sentence and we substitute in the
  // values we've just calculated
  let description = `${emoji} ${condiment} ${verb} like a ${cat} wearing ${fabricArticle} ${fabric} ${clothes} in ${roomArticle} ${room} ${emoji}`;

  // Finally, we add it to the page and hey presto!
  $('body').append(description);
  $(document).on("click", function() {
    location.reload()});
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
