var myGamePiece;

function startGame() {
  myGameArea.start();
  //skapar komponenter
  player1 = new component(10, 100, "aqua", 10, 120, 0, 0);
  player2 = new component(10, 100, "aqua", 1180, 120, 0, 0);
  gameBall = new component(20, 20, "aqua", 600, 200, 6, 4);
}

var myGameArea = {
    canvas: document.getElementById("superpongaren"), // Hämtar canvas-elementet från HTML med ID "superpongaren"
    start: function () {
      this.canvas.width = 1200; // Sätter bredden på canvas till 1200 pixlar
      this.canvas.height = 500; // Sätter höjden på canvas till 500 pixlar
      this.context = this.canvas.getContext("2d"); // Hämtar 2D-kontexten för att rendera på canvas
      this.interval = setInterval(updateGameArea, 20); // Anropar funktionen "updateGameArea" var 20:e millisekund för att uppdatera spelet
      window.addEventListener("keydown", function (e) {
        myGameArea.keys = myGameArea.keys || []; // Initierar en array för att lagra nedtryckta tangenter om den inte redan finns
        myGameArea.keys[e.keyCode] = e.type == "keydown"; // Lagrar tillståndet för tangenten (true om nedtryckt, false om släppt) i keys-arrayen
      });
      window.addEventListener("keyup", function (e) {
        myGameArea.keys[e.keyCode] = e.type == "keydown"; // Uppdaterar tillståndet för tangenten i keys-arrayen när den släpps
      });
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Rensar hela canvas genom att sudda ut pixlarna inom det definierade rektangelområdet
    },
  };

  function component(width, height, color, x, y, speedX, speedY) {
    this.gamearea = myGameArea; // Referens till spelområdet (myGameArea)
    this.width = width; // Bredden på komponenten
    this.height = height; // Höjden på komponenten
    this.x = x; // X-koordinat för komponentens position
    this.y = y; // Y-koordinat för komponentens position
    this.speedX = speedX; // Hastighet i X-riktning
    this.speedY = speedY; // Hastighet i Y-riktning
    this.update = function () {
      ctx = myGameArea.context; // Kontext för rendering på spelområdet
      ctx.fillStyle = color; // Fyllfärg för komponenten
      ctx.fillRect(this.x, this.y, this.width, this.height); // Ritar en fylld rektangel med komponentens egenskaper
    };
    this.newPos = function () {
      this.x += this.speedX; // Uppdaterar X-koordinaten baserat på hastigheten i X-riktning
      this.y += this.speedY; // Uppdaterar Y-koordinaten baserat på hastigheten i Y-riktning
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
  if (gameBall.x >= 1180) {
    gameBall.speedX = -gameBall.speedX;
  }
}

let points1 = 0;
let points2 = 0;
let element1 = document.getElementById("score1");   //Hämtar score1 från HTML
let element2 = document.getElementById("score2");   //Hämtar score2 från HTML

var ctx = canvas.getContext("2d");

function checkWinner(points1, points2) {
  if (points1 === 3) {
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
  if (points2 === 3) {
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
  if (gameBall.x >= 1180) {
    points1 += 1;
  }
  if (gameBall.x <= 0) {
    points2 += 1;
  }
  element1.innerHTML = points1;  //Lägger till antalet poäng i HTML
  element2.innerHTML = points2;  //Lägger till antalet poäng i HTML
}
function updateGameArea() {
    myGameArea.clear(); // Rensar spelområdet för att uppdatera det med nya element
  
    player1.speedY = 0; // Återställer spelare 1:s hastighet i Y-riktning till 0
  
    if (player1.y <= 400) { // Kontrollerar om spelare 1:s position är mindre än eller lika med 400
      if (myGameArea.keys && myGameArea.keys[83]) { // Kontrollerar om det finns tangenttryckningar och om tangenten med keyCode 83 (S-tangenten) är nedtryckt
        player1.speedY = 5; // Sätter spelare 1:s hastighet i Y-riktning till 5 (neråt)
      }
    }
  
    if (player1.y >= 0) { // Kontrollerar om spelare 1:s position är större än eller lika med 0
      if (myGameArea.keys && myGameArea.keys[87]) { // Kontrollerar om det finns tangenttryckningar och om tangenten med keyCode 87 (W-tangenten) är nedtryckt
        player1.speedY = -5; // Sätter spelare 1:s hastighet i Y-riktning till -5 (uppåt)
      }
    }
  
    player1.newPos(); // Uppdaterar spelare 1:s position baserat på dess hastighet
    player1.update(); // Uppdaterar ritningen av spelare 1 på spelområdet
  
    player2.speedY = 0; // Återställer spelare 2:s hastighet i Y-riktning till 0
  
    if (player2.y <= 400) { // Kontrollerar om spelare 2:s position är mindre än eller lika med 400
      if (myGameArea.keys && myGameArea.keys[76]) { // Kontrollerar om det finns tangenttryckningar och om tangenten med keyCode 76 (L-tangenten) är nedtryckt
        player2.speedY = 5; // Sätter spelare 2:s hastighet i Y-riktning till 5 (neråt)
      }
    }
  
    if (player2.y >= 0) { // Kontrollerar om spelare 2:s position är större än eller lika med 0
      if (myGameArea.keys && myGameArea.keys[79]) { // Kontrollerar om det finns tangenttryckningar och om tangenten med keyCode 79 (O-tangenten) är nedtryckt
        player2.speedY = -5; // Sätter spelare 2:s hastighet i Y-riktning till -5 (uppåt)
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
