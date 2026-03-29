
//setting up canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//creating grid variables
let gridSize = 30;
let gameSize = Math.min(canvas.width, canvas.height);
let cols = Math.floor(gameSize / gridSize);
let rows = cols;
let Xoffset = (canvas.width - gameSize)/2;
let Yoffset = (canvas.height - gameSize)/2;

//declaring variables
let score=0;
let highscore= Number(localStorage.getItem("highScore")) || 0;
let scoreSaved=false;
let lastTime = 0;
let time=0;
let moveDelay = 100;
let accumulator=0;
let prevSnake= [];

let gameState="menu";
startScreen();
requestAnimationFrame(gameLoop);
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    time +=deltaTime;

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(gameState === "menu") startScreen();
    else if(gameState === "playing"){
        updateGame(deltaTime);
        displayGame();
    }
    else if(gameState === "paused"){
        displayGame();
        pauseScreen();
    }
    else if(gameState === "gameOver"){
        displayGame();
        gameOverScreen();
    }

    // Continue loop
    requestAnimationFrame(gameLoop);
}