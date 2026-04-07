let dx=1;
let dy=0;
let currentDir = "R";
let Dir=["R"] //direction of snake

//creating snake
let snake = [
  {x:10,y:10},
  {x:9,y:10},
  {x:8,y:10}
];
//creating food
let food = {
    x:0,
    y:0
}
generateFood(food);

//function to check if food generated inside snake
function foodInSnake(food){
    for (let i = 0; i < snake.length; i++) {
        if(snake[i].x === food.x && snake[i].y === food.y){
            return true;
        }
    }
    return false;
}

//function to generate food location at random place
function generateFood(food){
do {
        food.x = Math.floor(Math.random()*cols);
        food.y = Math.floor(Math.random()*rows);
} while(foodInSnake(food));
}

//new snake head after movement
function getNewHead() {
    return {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
}

//checking gameover conditions
function isGameOver(head){
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}
    
//Update Snake
function updateSnake(head){
    //updating head
    snake.unshift(head);
    //deleting tail if food not eaten, and adding new food if eaten
    if(head.x === food.x && head.y === food.y){
        score++;
        if(moveDelay>50){
            moveDelay*=0.98;
        }
        generateFood(food);
    }
    else snake.pop();
}

//updating direction
function updateDirection(){
    let nextDir = Dir.shift();
    //prevents reverse
    if(
            (nextDir === "U" && currentDir !== "D") ||
            (nextDir === "D" && currentDir !== "U") ||
            (nextDir === "L" && currentDir !== "R") ||
            (nextDir === "R" && currentDir !== "L")
        ){
            currentDir = nextDir;

            if(currentDir === "U"){ dx=0; dy=-1; }
            if(currentDir === "D"){ dx=0; dy=1; }
            if(currentDir === "L"){ dx=-1; dy=0; }
            if(currentDir === "R"){ dx=1; dy=0; }
        }
}

function updateGame(deltaTime){
    // Accumulate time
    accumulator += deltaTime;
    // Update logic at fixed intervals
    while(accumulator > moveDelay){

        updateDirection();

        prevSnake = snake.map(part => ({...part}));
        let head = getNewHead();

        if(isGameOver(head)){
            gameState="gameOver";
            break;
        }
        updateSnake(head);

        accumulator = accumulator%moveDelay;
    }
}

function resetGame(){
    snake = [
            {x:10,y:10},
            {x:9,y:10},
            {x:8,y:10}
    ];
    dx = 1;
    dy = 0;
    currentDir = "R";
    Dir = ["R"];
    score = 0;
    moveDelay=speed[speedIndex].val;
    lastTime=0;
    time=0;
    accumulator=0;
    generateFood(food);
    scoreSaved=false;
    scoreSent=false;
}