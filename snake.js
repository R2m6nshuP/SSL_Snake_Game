let dx=1;
let dy=0;
let currentDir = "R";
let Dir=["R"] //direction of snake
let pendingGrowth = 0;
 // let prevSnake =[];
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
let goldenApple={
    x:0,
    y:0,
    active:false,
    timer:0
};
function generategoldenApple(){
    if(goldenApple.active) return;
    do{
        goldenApple.x=Math.floor(Math.random()*cols);
        goldenApple.y=Math.floor(Math.random()*rows);
    } while( foodInSnake(goldenApple) || (goldenApple.x===food.x && goldenApple.y === food.y) );
    goldenApple.active = true;
    goldenApple.timer = (Math.floor(Math.random()*5000) + 5000)
}
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
        causeOfDeath = "wall"
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            causeOfDeath = "self"
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
        pendingGrowth++;
        if(speed[speedIndex].name == "HELLMODE" && moveDelay<35){
            moveDelay*=0.99;
        }
        generateFood(food);
        if(Math.random() < 0.20) generategoldenApple();
    }
    if( goldenApple.active && goldenApple.x===head.x && goldenApple.y===head.y) {
        score+=3;
        pendingGrowth+=3;
        goldenApple.active=false;
    
    }
    if(pendingGrowth>0){
        pendingGrowth--;
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
    //adding for golden apple
    if(goldenApple.active){
        goldenApple.timer -= deltaTime;
        if(goldenApple.timer <= 0) goldenApple.active = false;
    }
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
    pendingGrowth=0;
    accumulator=0;
    generateFood(food);
    goldenApple.active=false;
    scoreSaved=false;
    scoreSent=false;
    startTime=Date.now()
}