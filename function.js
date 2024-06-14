// FUNCTIONS

let receivedPowerup = 0;

// Draw Start Screen
function drawStart() {
  drawMain();

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

// Draw Game Elements
function runGame() {
  // LOGIC
  moveHeli();
  moveWalls();
  movePowerUp();
  checkCollision();

  // DRAW
  drawGame();
}

function moveHeli() {
  // Accelerate upward if mouse pressed
  if (mouseIsPressed) {
    heli.speed += -1;
  }

  // Apply Gravity
  heli.speed += heli.accel;

  // Contrain Speed (max/min)
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  // Mose Helicopter by its speed
  heli.y += heli.speed;
}

function moveWalls() {
  // Wall 1
  wall1.x += -3;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall3.x + 500;
    wall1.y = Math.random() * 300 + 100;
  }

  // Wall 2
  wall2.x += -3;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
    wall2.y = Math.random() * 300 + 100;
  }

  // Wall 3
  wall3.x += -3;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
    wall3.y = Math.random() * 300 + 100;
  }
}

function movePowerUp() {
  shield.x += -3;
  if (shield.x + shield.w < 0) {
    shield.x = shield.w + cnv.width;
    shield.y = Math.random() * 300 + 100;
  }
}

function checkCollision() {
  // Collision with Top and Bottom Green Bars
  if (shield.active === false) {
    if (heli.y < 50) {
      gameOver();
    } else if (heli.y + heli.h > cnv.height - 50) {
      gameOver();
    }
  }

  // Collision with the Walls
  if (shield.active === false) {
    if (
      heli.x < wall1.x + wall1.w &&
      heli.x + heli.w > wall1.x &&
      heli.y < wall1.y + wall1.h &&
      heli.y + heli.h > wall1.y
    ) {
      gameOver();
    } else if (
      heli.x < wall2.x + wall2.w &&
      heli.x + heli.w > wall2.x &&
      heli.y < wall2.y + wall2.h &&
      heli.y + heli.h > wall2.y
    ) {
      gameOver();
    } else if (
      heli.x < wall3.x + wall3.w &&
      heli.x + heli.w > wall3.x &&
      heli.y < wall3.y + wall3.h &&
      heli.y + heli.h > wall3.y
    ) {
      gameOver();
    }
  }

  // Invincibility
  if (shield.active === true) {
    if (
      heli.x < wall1.x + wall1.w &&
      heli.x + heli.w > wall1.x &&
      heli.y < wall1.y + wall1.h &&
      heli.y + heli.h > wall1.y
    ) {
      wallDown.play();
      wall1.x = wall1.x + cnv.width;
      wall1.y = Math.random() * 300 + 100;
    } else if (
      heli.x < wall2.x + wall2.w &&
      heli.x + heli.w > wall2.x &&
      heli.y < wall2.y + wall2.h &&
      heli.y + heli.h > wall2.y
    ) {
      wallDown.play();
      wall2.x = wall2.x + 1000;
      wall2.y = Math.random() * 300 + 100;
    } else if (
      heli.x < wall3.x + wall3.w &&
      heli.x + heli.w > wall3.x &&
      heli.y < wall3.y + wall3.h &&
      heli.y + heli.h > wall3.y
    ) {
      wallDown.play();
      wall3.x = wall3.x + 1000;
      wall3.y = Math.random() * 300 + 100;
    } else if (heli.y < 50) {
      heli.y = 50;
    } else if (heli.y + heli.h > cnv.height - 50) {
      heli.y = cnv.height - 50 - heli.h;
    }
  }
}

function gameOver() {
  explosion.play();
  state = `gameover`;

  setTimeout(reset, 2000);
}

function drawGame() {
  drawMain();
  drawWalls();
  travel();
  powerUp();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMain();
  drawWalls();

  if (distance > best) {
    best = distance;
  }
  bestText = `BEST: ${best}`;

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}

// Helper Functions
function reset() {
  state = `start`;
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.5,
  };
  shield = {
    x: cnv.width + Math.random() * 1000 + 500,
    y: Math.random() * 300 + 100,
    w: 80,
    h: 80,
    active: false,
  };
  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall2 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };

  distance = 0;
  distanceText = `DISTANCE: ${distance}`;
  bestText = `BEST: ${best}`;
  heliImg.src = `img/heliBlueTransparent.png`;
}

function drawWalls() {
  ctx.fillStyle = "green";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall3.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
}

function drawMain() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(distanceText, 25, cnv.height - 15);
  ctx.fillText(bestText, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);

  // Power-Ups
  ctx.drawImage(shieldImg, shield.x, shield.y, shield.w, shield.h);
}

function travel() {
  distance++;
  distanceText = `DISTANCE: ${distance}`;
}

function powerUp() {
  if (
    heli.x < shield.x + shield.w &&
    heli.x + heli.w > shield.x &&
    heli.y < shield.y + shield.h &&
    heli.y + heli.h > shield.y
  ) {
    shield.active = true;
    shield.x = shield.x + Math.random() * 2000 + 500;
    shield.y = Math.random() * 300 + 100;
    receivedPowerup = distance;
  }
  // touched the powerup on distance = 1000
  // stay powered up until distance is 500 more than receivedPowerup value  e.g. 1500

  if (shield.active == true && distance < receivedPowerup + 500) {
    if (distance == receivedPowerup + 1) {
      shieldUp.play();
    }

    heliImg.src = `img/heliGreenTransparent.png`;
  } else if (shield.active == true && distance > receivedPowerup) {
    shieldBreak.play();
    shield.active = false;
    heliImg.src = `img/heliBlueTransparent.png`;
  }
}
