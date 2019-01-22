/*****************

redaction activity
mattie ka

******************/


"use strict";

let $spans;

$(document).ready(setup);
  function setup() {
    $spans = $('span');
    setInterval(update,500);
    $spans.on('click',spanClicked);
  }



function update() {
    console.log("Update!");
    $spans.each(updateSpan);
}

function updateSpan() {
  console.log("update span???");
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}

function spanClicked() {
  $(this).addClass("redacted");
  $(this).removeClass("revealed");
}

//text pulled from pokemon sun and moon pokedex
