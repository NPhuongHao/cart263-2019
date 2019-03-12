"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let keywords;

$(document).ready(setup);

function setup() {
  $. getJSON('data/kidKeywords.json', dataLoaded);
}

function dataLoaded(data) {
  console.log("This data has been loaded");
}
