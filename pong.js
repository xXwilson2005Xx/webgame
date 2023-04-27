let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";

let c = canvas.getContext("2d");

function paintSquare() {
    // "bollen"
    const s = 30; // Kvadratens sidlängd
    c.fillStyle = "aqua";
    c.fillRect(s*25, s*10, s, s);
    
}
function paintPlayer1() {
    // "vänster"
    const s = 30; // Kvadratens sidlängd
    c.fillStyle = "aqua";
    c.fillRect(s , s*10 , s, s*8);
    
}
function paintPlayer2() {
    // "höger"
    const s = 30; // Kvadratens sidlängd
    c.fillStyle = "aqua";
    c.fillRect(s*49,  s*10, s, s*8);
    
}

paintSquare()
paintPlayer1()
paintPlayer2()
