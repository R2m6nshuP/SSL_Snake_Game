<<<<<<< HEAD
let dx=1;
let dy=0;
let currentDir = "R";
let Dir=["R"]; 
let pendingGrowth = 0;
let enchantedSpawnTimer = 15000; 
let enchantedEffectTimer = 0;    
let isEnchanted = false;         

let snake = [
  {x:10,y:10},
  {x:9,y:10},
  {x:8,y:10}
];

let food = { x:0, y:0 };
generateFood(food);

let pumpkinPie={
    x:0, y:0, active:false, timer:0
};

let enchantedApple={
    x:0, y:0, active:false, timer:0 
};

function generatepumpkinPie(){
    if(pumpkinPie.active) return;
    do{
        pumpkinPie.x=Math.floor(Math.random()*cols);
        pumpkinPie.y=Math.floor(Math.random()*rows);
    } while( foodInSnake(pumpkinPie) || (pumpkinPie.x===food.x && pumpkinPie.y === food.y) );
    pumpkinPie.active = true;
    pumpkinPie.timer = (Math.floor(Math.random()*5000) + 5000);
}

function generateenchantedApple(){
    if(enchantedApple.active) return;
    do{
        enchantedApple.x=Math.floor(Math.random()*cols);
        enchantedApple.y=Math.floor(Math.random()*rows);
    } while( foodInSnake(enchantedApple) || (enchantedApple.x===food.x && enchantedApple.y === food.y) || (enchantedApple.x===pumpkinPie.x && enchantedApple.y === pumpkinPie.y) );
    enchantedApple.active = true;
    enchantedApple.timer = (Math.floor(Math.random()*4000) + 5000); // visible only for [5,9]
}

function foodInSnake(food){
    for (let i = 0; i < snake.length; i++) {
        if(snake[i].x === food.x && snake[i].y === food.y){
            return true;
        }
    }
    return false;
}

function generateFood(food){
    do {
        food.x = Math.floor(Math.random()*cols);
        food.y = Math.floor(Math.random()*rows);
    } while(foodInSnake(food));
}

function getNewHead() {
    return { x: snake[0].x + dx, y: snake[0].y + dy };
}

function isGameOver(head){
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        causeOfDeath = "wall";
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            causeOfDeath = "self";
            return true;
        }
    }
    return false;
}
    
function updateSnake(head){
    snake.unshift(head);
    
    if(head.x === food.x && head.y === food.y){
        score++;
        pendingGrowth++;
        if(speed[speedIndex].name == "HELLMODE" && moveDelay > 35){
            moveDelay*=0.99;
        }
        generateFood(food);
        if(Math.random() < 0.35) generatepumpkinPie(); //35% chance
    }
    
    if( pumpkinPie.active && pumpkinPie.x===head.x && pumpkinPie.y===head.y) {
        score+=3; 
        pendingGrowth+=3; //length also increases by 3
        pumpkinPie.active=false;
    }
    
    if( enchantedApple.active && enchantedApple.x===head.x && enchantedApple.y===head.y) {
        isEnchanted = true; 
        enchantedEffectTimer = 6000; //effect valid for 6s
        enchantedApple.active = false; 
    }

    if(pendingGrowth>0){
        pendingGrowth--;
    }
    else snake.pop();
}

function updateDirection(){
    let nextDir = Dir.shift();
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
    if(pumpkinPie.active){
        pumpkinPie.timer -= deltaTime;
        if(pumpkinPie.timer <= 0) pumpkinPie.active = false;
    }
    if(enchantedApple.active){
        enchantedApple.timer -= deltaTime;
        if(enchantedApple.timer <= 0) enchantedApple.active = false; 
    }
    
    if(enchantedApple.active==false){
        enchantedSpawnTimer-=deltaTime;
        if(enchantedSpawnTimer<=0){
            generateenchantedApple();
            enchantedSpawnTimer=Math.random()*10000+20000;  //spawn in [20,120]
        }
    } 

    if(isEnchanted){
        enchantedEffectTimer-=deltaTime;
        if(enchantedEffectTimer<=0){
            isEnchanted=false;
            moveDelay=speed[speedIndex].val; 
            enchantedEffectTimer=0;
        }
    }
    
    accumulator += deltaTime;
    
    while(accumulator > moveDelay){

        updateDirection();

        prevSnake = snake.map(part => ({...part}));
        let head = getNewHead();

        if(isGameOver(head)){
            if(isEnchanted){ //wrapping around the walls
                if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
                    if(head.x<0) head.x+=cols;
                    else if(head.x >= cols) head.x-=cols;
                    else if(head.y < 0) head.y+=rows;
                    else head.y-=rows;
                } else {
 
                }
            }
            else {
                gameState="gameOver";
                break;
            }
        }
        
        updateSnake(head);
         
        accumulator -= moveDelay; 
    }
}

function resetGame(){
    snake = [ {x:10,y:10}, {x:9,y:10}, {x:8,y:10} ];
    dx = 1; dy = 0; currentDir = "R"; Dir = ["R"]; score = 0;
    moveDelay=speed[speedIndex].val;
    pendingGrowth=0; accumulator=0;
    generateFood(food); pumpkinPie.active=false; scoreSaved=false;
    enchantedApple.active=false;
    enchantedSpawnTimer=Math.random()*10000+15000;
    isEnchanted=false;
    enchantedEffectTimer = 0;
    
    scoreSent=false;
    startTime=Date.now();
    lastTime = performance.now(); 
}
=======
let dx=1;
let dy=0;
let currentDir = "R";
let Dir=["R"] //direction of snake

//creating snake
snake = [{x:0, y:0}];
//demoReset();  //defined at end of file
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
    if(!gameMode.wrap){
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
            causeOfDeath = "WALL"
            return true;
        }
    }
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
        if(speed[speedIndex].name == "HELLMODE" && moveDelay>35){
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
    let startY = Math.floor(rows / 2);
    snake = [
        {x:3, y:startY},
        {x:2, y:startY},
        {x:1, y:startY}
    ];
    prevSnake = snake.map(part => ({...part}));
    dx = 1;
    dy = 0;
    currentDir = "R";
    Dir = ["R"];
    score = 0;
    moveDelay=speed[speedIndex].val;
    lastTime=performance.now();
    time=0;
    accumulator=0;
    generateFood(food);
    highScoreSaved=false;
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
    food = {x: -1, y: -1}
    accumulator = 0;
    Dir=["R"];
    currentDir="R";
    moveDelay = speed[speedIndex].val * (gridSize/30);
}
>>>>>>> Om's-branch
