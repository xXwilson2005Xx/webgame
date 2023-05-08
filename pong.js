var myGamePiece;

function startGame() {
    myGameArea.start();
    //skapar komponenter
    player1 = new component(10, 100, "aqua", 10, 120, 0, 0);
    player2 = new component(10, 100, "aqua", 1170, 120, 0, 0);
    gameBall = new component(20, 20, "aqua", 600, 200, 0, 2)
}

var myGameArea = {
    canvas : document.getElementById("superpongaren"), //Hämtar canvas från html
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, speedX, speedY) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;    
    this.x = x;
    this.y = y; 
    this.speedX = speedX;
    this.speedY = speedY;   
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

function checkBounce() {
  
    if (gameBall.y >= myGameArea.canvas.height - gameBall.height) {
      gameBall.speedY = -gameBall.speedY;
    }
    if (gameBall.y <= 0) {
        gameBall.speedY = -gameBall.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    player1.speedY = 0;    
    if (player1.y <= 400) {if (myGameArea.keys && myGameArea.keys[83]) {player1.speedY = 5; }}    
    if (player1.y >= 0 ) {if (myGameArea.keys && myGameArea.keys[87]) {player1.speedY = -5; }}
    player1.newPos();    
    player1.update();

    player2.speedY = 0;    
    if (player2.y <= 400) {if (myGameArea.keys && myGameArea.keys[76]) {player2.speedY = 5; }}
    if (player2.y >=0 ) {if (myGameArea.keys && myGameArea.keys[79]) {player2.speedY = -5; }}
    player2.newPos();    
    player2.update();

    gameBall.newPos();    
    gameBall.update();
    checkBounce()
}

