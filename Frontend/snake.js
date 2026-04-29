let dx=1;
let dy=0;
let currentDir = "R";
let Dir=["R"] //direction of snake

//creating snake
snake = [{x:0, y:0}];
let pendingGrowth=0; //for tail
//creating food
let food = [
    {name:"apple", score:1, wrap:false, ghost:false, active:true, timer:0, x:-1, y:-1},
    {name:"pie", score:3, wrap:false, ghost:false, active:false, timer:0, x:-1, y:-1},
    {name:"goldenApple", score:0, wrap:true, ghost:true, active:false, timer:0, x:-1, y:-1}
]
//food abilities
let wrapped=false;
let ghosted=false;
let enchantedSpawnTimer = 15000; 
let enchantedEffectTimer = 0;    
let isEnchanted = false;
demoReset();

//function to check if food generated inside snake or other food(added later so function name still foodInSnake)
function foodInSnake(food, p){
    for (let i = 0; i < snake.length; i++){
        if(snake[i].x === food[p].x && snake[i].y === food[p].y){
            return true;
        }
    }
    for (let i=0; i < food.length; i++){
        if( i !== p && food[i].x === food[p].x && food[i].y === food[p].y){
            return true;
        }
    }
    return false;
}

//function to generate food location at random place
function generateFood(food, p){
    do{
        food[p].x = Math.floor(Math.random()*cols);
        food[p].y = Math.floor(Math.random()*rows);
    } 
    while(foodInSnake(food, p));
    food[p].active=true;
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
    if(!(gameMode.wrap || wrapped)){
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
            causeOfDeath = "WALL";
            return true;
        }
    }
    //collision with itself
    if(!(gameMode.ghost || ghosted)){
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                causeOfDeath = "SELF";
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
    for(let i=0; i<food.length; i++){
        if(head.x === food[i].x && head.y === food[i].y){
            if(!food[i].active) continue;
            //score
            score+=food[i].score;
            food[i].active=false;
            //increase speed of snake in HELLMODE
            if(speed[speedIndex].name == "HELLMODE" && moveDelay>(1.2*gridSize)){
                moveDelay*=0.995;
            }
            //ability
            if(food[i].wrap) wrapped = true;
            if(food[i].ghost) ghosted = true;
            isEnchanted= (wrapped && ghosted);
            if(isEnchanted) enchantedEffectTimer = 6000; //effect valid for 6s        scale according to speed?
            //regenerate after eating
            if(i==0){
                generateFood(food, 0); //generating apple

                if(Math.random() > 0.3 && !food[1].active){        //if not already active
                    generateFood(food, 1); //generating pie with a 30% chance of spawing after eating an apple
                    food[1].timer = (Math.floor(Math.random()*7000) + 5000);  //scale according to speed?
                }
            }
            //for tail
            pendingGrowth+=food[i].score;
        }
    }
    //deleting tail
    if(pendingGrowth>0) pendingGrowth--;
    else snake.pop();
    
}
//adjusting food spawn timings and stuff
function updateFood(deltaTime){
    if(food[1].active){
        food[1].timer -= deltaTime;
        if(food[1].timer <= 0) food[1].active = false;
    }
    if(food[2].active){
        food[2].timer -= deltaTime;
        if(food[2].timer <= 0) food[2].active = false;
    }
    else{
        enchantedSpawnTimer-=deltaTime;
        if(enchantedSpawnTimer<=0){
            generateFood(food, 2);
            food[2].timer= (Math.random()+1)*5000; //visible for 5-10 seconds
            enchantedSpawnTimer= (Math.random()+1)*20000;  //spawn in 20-40 seconds  scale according to speed?
        }
    }
    if(isEnchanted){
        enchantedEffectTimer-=deltaTime;
        if(enchantedEffectTimer<=0){
            isEnchanted=false;
            ghosted=false;
            wrapped=false; 
            enchantedEffectTimer=0;
        }
    }
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
    updateFood(deltaTime);
    // Accumulate time
    accumulator += deltaTime;
    // Update logic at fixed intervals
    while(accumulator > moveDelay){

        updateDirection();

        prevSnake = snake.map(part => ({...part}));

        let head = getNewHead();
        if(gameMode.wrap || wrapped){
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
    pendingGrowth=0;
    //reset direction
    dx = 1;
    dy = 0;
    currentDir = "R";
    Dir = ["R"];
    //time related
    moveDelay=speed[speedIndex].val* (gridSize/30);
    lastTime=performance.now();
    time=0;
    accumulator=0;
    //food
    food = [
        {name:"apple", score:1, wrap:false, ghost:false, active:true, timer:0, x:-1, y:-1},
        {name:"pie", score:3, wrap:false, ghost:false, active:false, timer:0, x:-1, y:-1},
        {name:"goldenApple", score:0, wrap:true, ghost:true, active:false, timer:0, x:-1, y:-1}
    ]
    generateFood(food, 0);
    wrapped=false;
    ghosted=false;
    enchantedSpawnTimer = 15000; 
    enchantedEffectTimer = 0;    
    isEnchanted = false;
    //others
    score=0;
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
    food.forEach( item => {
        item.x=-1;
        item.y=-1;
    })  //moving food out of grid
    accumulator = 0;
    Dir=["R"];
    currentDir="R";
    moveDelay = speed[speedIndex].val * (gridSize/30);
}
