// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables (Once)
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";

var shieldImg = document.createElement(`img`);
shieldImg.src = `img/shield.png`;
var shield = false;

let explosion = document.createElement(`audio`);
explosion.src = `sound/explosion.wav`;

let propeller = document.createElement(`audio`);
propeller.src = `sound/propeller.wav`;

var shieldUp = document.createElement(`audio`);
shieldUp.src = `sound/shield.wav`;
var shieldBreak = document.createElement(`audio`);
shieldBreak.src = `sound/shield-break.wav`;

var wallDown = document.createElement(`audio`);
wallDown.src = `sound/wallbreak.wav`;

let mouseIsPressed = false;

var distance = 0;
var distanceText = `DISTANCE: ${distance}`;

var best = distance;
var bestText = `BEST: ${best}`;

// Global Variables (Reset)
let state = `start`;
let heli = {
  x: 200,
  y: 250,
  w: 80,
  h: 40,
  speed: 0,
  accel: 0.5,
};
var shield = {
  x: cnv.width + 2500,
  y: Math.random() * 300 + 100,
  w: 80,
  h: 80,
  active: false,
};
let wall1 = {
  x: cnv.width,
  y: Math.random() * 300 + 100,
  w: 50,
  h: 100,
};
let wall2 = {
  x: cnv.width + 1000,
  y: Math.random() * 300 + 100,
  w: 50,
  h: 100,
};
let wall3 = {
  x: cnv.width + 1000,
  y: Math.random() * 300 + 100,
  w: 50,
  h: 100,
};

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === `start`) {
    drawStart();
  } else if (state === `gameon`) {
    runGame();
  } else if (state === `gameover`) {
    drawGameOver();
  } else if (state === `continue`) {
    continueGame();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

// Event Stuff
document.addEventListener(`mousedown`, mousedownHandler);
document.addEventListener(`mouseup`, mouseupHandler);

// Start Game on Mousedown
function mousedownHandler() {
  mouseIsPressed = true;

  // Play propeller sound
  propeller.currentTime = 0;
  propeller.play();

  if (state === `start`) {
    state = `gameon`;
  }
}

function mouseupHandler() {
  mouseIsPressed = false;

  if (state === `start`) {
    state = `gameon`;
  }
}
