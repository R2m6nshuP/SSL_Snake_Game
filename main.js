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
let score = 0;
let highscore = Number(localStorage.getItem("highScore")) || 0;
let scoreSaved = false;
let lastTime = 0;
let time = 0;
let moveDelay = 100;
let accumulator = 0;
let prevSnake = [];

let gameState = "menu";

// --- BOOTSTRAP MODAL CODE ---
let currentPlayerName = "Anonymous"; 
const startModalElement = document.getElementById('startModal');
const startModal = new bootstrap.Modal(startModalElement);
const startBtn = document.getElementById('startBtn');
const nameInput = document.getElementById('playerName');

// Show the modal when the page loads
if(gameState === "menu") {
    startModal.show();
}

// Start game when button is clicked
startBtn.addEventListener("click", () => {
    if(nameInput.value.trim() !== "") {
        currentPlayerName = nameInput.value.trim();
    }
    startModal.hide();
    resetGame();
    gameState = "playing";
});
// ----------------------------

// Start the continuous game loop
requestAnimationFrame(gameLoop);

function gameLoop(timestamp){
    // Calculate delta time
    if (!lastTime) lastTime = timestamp; // Safety check for the very first frame
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    time += deltaTime;

    // Clear screen and paint black background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Only run game logic if we are actually playing or paused
    if(gameState === "playing"){
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