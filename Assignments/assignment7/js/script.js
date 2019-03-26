"use strict";

/*****************

Music Box
mattie ka

A simple example of procedural music generation using Pizzicato's
synthesis and soundfile playing abilities.

messed around with filters and tempos. 

******************/

// Time for one note
const NOTE_TEMPO = 500;
// Time for one beat

// time for one note but as a variable
let noteTempo = 500;

const DRUM_TEMPO = 250;
// Attack time for a note (in seconds)
const ATTACK = 0.1;
// Release time for a note (in seconds)
const RELEASE = 0.1;

let musicStarted = false;
let distortion;
let quadrafuzz;
let reverb;
let delay;

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
let pattern = ['x','*','xo*',' ','x','x','xo','*'];
// Which beat of the pattern we're at right now
let patternIndex = 0;

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

  distortion = new Pizzicato.Effects.Distortion({
    gain: random(0,1),
    mix: 0
  });

  quadrafuzz = new Pizzicato.Effects.Quadrafuzz({
    lowGain: random(0,1),
    midLowGain: random(0,1),
    midHighGain: random(0,1),
    highGain: random(0,1),
    mix: 0
  });

  reverb = new Pizzicato.Effects.Reverb({
    time: random(0.01,10),
    decay: random(0.01,10),
    reverse: true,
    mix: 0
  });

  delay = new Pizzicato.Effects.Delay({
    feedback: random(0,1),
    time: random(0,0.5),
    mix: 0
  });

  kick.addEffect(delay);
  snare.addEffect(delay);
  hihat.addEffect(delay);

  synth.addEffect(distortion);
  synth.addEffect(quadrafuzz);
  synth.addEffect(reverb);

}


// mousePressed
//
// Using this to start the note and drum sequences to get around
// user interaction (and to give the files time to load)
function mousePressed() {
  if (musicStarted == false) {
    // Start an interval for the notes
    synthPause();
    // Start an interval for the drums
    setInterval(playDrum,DRUM_TEMPO);

    // set musicStarted to true
    musicStarted = true;
  } else {
    console.log ("music playing already");
  }

}

// playNote
//
// Chooses a random frequency and assigns it to the synth
function playNote() {
  // Pick a random frequency from the array
  let frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
  // Set the synth's frequency
  synth.frequency = frequency;
  // If it's note already play, play the synth
  synth.play();

  //change tempo
  noteTempo = 250 * floor(random(1,4));
  console.log("note tempo is "+noteTempo);
  setTimeout(synthPause,noteTempo);
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



function synthPause() {
//establish a chance for synth to pause
//randomly generate number between 1 and 100, if it's above 70, the syth pauses.
  let probability;
  probability = random(0,100);
  console.log(probability);

  if (probability >= 70) {
    synth.pause();
    delay.mix = 0;
    setTimeout(synthPause,500);

  } else if (probability < 70 && probability >= 60) {
    distortion.mix = 1;
    distortion.gain = random(0,1);
    playNote();

  } else if (probability < 60 && probability >= 50){
    quadrafuzz.mix = 1;
    quadrafuzz.lowGain = random(0,1);
    quadrafuzz.midLowGain = random(0,1);
    quadrafuzz.midHighGain = random(0,1);
    quadrafuzz.highGain = random(0,1);
    delay.mix = 0;
    playNote();

  } else if (probability < 50 && probability >= 40) {
    reverb.mix = 1;
    reverb.time = random(0.01,1);
    reverb.decay = random(0.01,1);
    delay.mix = 1;
    playNote();

  } else if (probability < 40 && probability >= 20){
    distortion.mix = 0;
    quadrafuzz.mix = 0;
    reverb.mix = 0;
    delay.mix = 0;
    playNote();

  } else {
    playNote();
  }
}


// Nothing right now.

function draw() {
}
