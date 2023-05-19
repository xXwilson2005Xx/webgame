var myGamePiece;

function startGame() {
  myGameArea.start();
  //skapar komponenter
  player1 = new component(10, 100, "aqua", 10, 120, 0, 0);
  player2 = new component(10, 100, "aqua", 1180, 120, 0, 0);
  gameBall = new component(20, 20, "aqua", 600, 200, 6, 4);
}

var myGameArea = {
  canvas: document.getElementById("superpongaren"), //Hämtar canvas från html
  start: function () {
    this.canvas.width = 1200;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("keydown", function (e) {
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.keyCode] = e.type == "keydown";
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.keys[e.keyCode] = e.type == "keydown";
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, color, x, y, speedX, speedY) {
  this.gamearea = myGameArea;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
}

function checkBounce() {
  if (gameBall.y >= myGameArea.canvas.height - gameBall.height) {
    gameBall.speedY = -gameBall.speedY;
  }
  if (gameBall.y <= 0) {
    gameBall.speedY = -gameBall.speedY;
  }
  //check that x aligns with player2 (right)
  if (
    gameBall.x >= myGameArea.canvas.width - 30 &&
    gameBall.x < myGameArea.canvas.width - 25
  ) {
    //checks if y aligns with player2
    if (
      gameBall.y + gameBall.height > player2.y &&
      gameBall.y < player2.y + player2.height
    ) {
      gameBall.speedX = -gameBall.speedX;
    }
  }
  //check that x aligns with player1 (left)
  if (gameBall.x > 15 && gameBall.x <= 20) {
    //checks if y aligns with player1
    if (
      gameBall.y + gameBall.height > player1.y &&
      gameBall.y < player1.y + player1.height
    ) {
      gameBall.speedX = -gameBall.speedX;
    }
  }
  //check back wall bounce (left)
  if (gameBall.x <= 0) {
    gameBall.speedX = -gameBall.speedX;
  }
  //check back wall bounce (right)
  if (gameBall.x >= 1200) {
    gameBall.speedX = -gameBall.speedX;
  }
}

let points1 = 0;
let points2 = 0;
let element1 = document.getElementById("score1");
let element2 = document.getElementById("score2");

var ctx = canvas.getContext("2d");

function checkWinner(points1, points2) {
  if (points1 === 1) {
    myGameArea.clear();
    ctx.textAlign = "center";
    ctx.font = "75px Arial";
    ctx.fillText("Player 1 is the winner!", 500, 250);
    ctx.font = "25px Arial";
    ctx.fillText("Press Ctrl + R to play again", 500, 400);
    if (myGameArea.keys[13]) {
      startGame();
    }
  }
  if (points2 === 1) {
    myGameArea.clear();
    ctx.textAlign = "center";
    ctx.font = "75px Arial";
    ctx.fillText("Player 2 is the winner!", 500, 250);
    ctx.font = "25px Arial";
    ctx.fillText("Press Ctrl + R to play again", 500, 400);
    if (myGameArea.keys[13]) {
      startGame();
    }
  }
}

function points() {
  if (gameBall.x >= 1200) {
    points1 += 1;
  }
  if (gameBall.x <= 0) {
    points2 += 1;
  }
  element1.innerHTML = points1;
  element2.innerHTML = points2;
}

function updateGameArea() {
  myGameArea.clear();
  player1.speedY = 0;
  if (player1.y <= 400) {
    if (myGameArea.keys && myGameArea.keys[83]) {
      player1.speedY = 5;
    }
  }
  if (player1.y >= 0) {
    if (myGameArea.keys && myGameArea.keys[87]) {
      player1.speedY = -5;
    }
  }
  player1.newPos();
  player1.update();

  player2.speedY = 0;
  if (player2.y <= 400) {
    if (myGameArea.keys && myGameArea.keys[76]) {
      player2.speedY = 5;
    }
  }
  if (player2.y >= 0) {
    if (myGameArea.keys && myGameArea.keys[79]) {
      player2.speedY = -5;
    }
  }
  player2.newPos();
  player2.update();

  gameBall.newPos();
  gameBall.update();
  checkBounce();
  points();
  checkWinner(points1, points2);
}
