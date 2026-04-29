//setting up canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas.width, canvas.height);

//creating grid variables
let gridSize = 30;  //size of one cell not whole grid
let gameWidth = canvas.width * 0.8;
let gameHeight = canvas.height * 0.8;
let cols = Math.floor(gameWidth / gridSize);
let rows = Math.floor(gameHeight / gridSize);
//X and Y of grid
let Xoffset = (canvas.width - cols*gridSize)/2;
let Yoffset = (canvas.height - rows*gridSize)/2;

//declaring other variables
let score=0;
//local storage returns string to converted to Number and return 0 if storage empty
let highscore= Number(localStorage.getItem("highScore")) || 0;
//time related variables for gameplay loop
let lastTime = 0;
let time=0;
let moveDelay = 400;
let accumulator=0;
//storing one step previous snake for gameplay animation
let prevSnake= [];
//gameState consists of menu, settings, playing, paused, gameOver, more can be added later
let gameState="menu";

//some variables have been declared in other js files for better understanding
