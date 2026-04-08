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
let moveDelay = 400;
let accumulator=0;
let prevSnake= [];
let gameState="menu";

