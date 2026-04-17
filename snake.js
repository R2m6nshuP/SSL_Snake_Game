let dx=1;
let dy=0;
let currentDir = "R";
let Dir=["R"] //direction of snake

//creating snake
snake = [{x:0, y:0}];
//creating food
let food = {
    x:0,
    y:0
}
generateFood(food);
demoReset();

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
    do{
        food.x = Math.floor(Math.random()*cols);
        food.y = Math.floor(Math.random()*rows);
    } 
    while(foodInSnake(food));
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
    //collision with wall
    if(!gameMode.wrap){
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
            causeOfDeath = "WALL"
            return true;
        }
    }
    //collision with itself
    if(!gameMode.ghost){
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                causeOfDeath = "SELF"
                return true;
            }
        }
    }
    return false;
} 
    
//Update Snake
function updateSnake(head){
    //updating head
    snake.unshift(head);
    //Making new food if apple eaten
    if(head.x === food.x && head.y === food.y){
        score++;
        //increase speed of snake in HELLMODE
        if(speed[speedIndex].name == "HELLMODE" && moveDelay>(40*gridSize/30)){
            moveDelay*=0.995;  
        }
        generateFood(food);
    }
    //deleting tail if food not eaten
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
        if(gameMode.wrap){
            head.x = (head.x + cols) % cols;
            head.y = (head.y + rows) % rows;
        }
        if(isGameOver(head)){
            if(gameState=="playing"){
                gameState="gameOver";
                shakeTime = shakeDuration;
                break;
            }
            else{
                //updating demosnake variables
                demoReset();
                break;
            }
        }
        updateSnake(head);

        accumulator = accumulator%moveDelay;
    }
}
//resetting all variables 
function resetGame(){
    //reset snake
    let startY = Math.floor(rows / 2);
    snake = [
        {x:3, y:startY},
        {x:2, y:startY},
        {x:1, y:startY}
    ];
    prevSnake = snake.map(part => ({...part}));
    //reset direction
    dx = 1;
    dy = 0;
    currentDir = "R";
    Dir = ["R"];
    //time related
    moveDelay=speed[speedIndex].val;
    lastTime=performance.now();
    time=0;
    accumulator=0;

    score=0;
    generateFood(food);
    scoreSent=false;
    causeOfDeath="";
    duration=0; //duration of game
}

function demoReset(){
    let startY = Math.floor(rows / 5);
    snake = [
        {x:6, y:startY},
        {x:5, y:startY},
        {x:4, y:startY},
        {x:3, y:startY},
        {x:2, y:startY},
        {x:1, y:startY}
    ];
    prevSnake = snake.map(part => ({...part}));
    food = {x: -1, y: -1}  //moving food out of grid
    accumulator = 0;
    Dir=["R"];
    currentDir="R";
    moveDelay = speed[speedIndex].val * (gridSize/30);
}
