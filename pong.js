



let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext("2d")

context.fillStyle = "aqua"
context.fillRect(10, 10, canvas.width, canvas.height)


let centerLine = {
    color: "white",
    width: 25,
    height: 25,
    posX: 10,
    posY: 10,
  }