let btn =document.querySelector("#confirmbtn");
let username = "playerName" ;
let introScreen = document.querySelector("#startScreen")
let flexBox = document.querySelector(".content")
let alertBox=document.createElement("h3")
alertBox.innerHTML=`<h3>Please enter a username to continue!</h3>`
let gameStarted=false;
btn.addEventListener("click", function(){
    username = document.querySelector("#username").value.trim();
    if(username != ""){
        introScreen.style.display = "none"; //removes the introscreen
        gameStarted=true;
    }
    else{
        flexBox.append(alertBox);

    }

})

scoreSent = false; //is score sent to flask?
let causeOfDeath;
let duration=0;
//variables for screen shake at gameOver
let shakeTime = 0;
let shakeDuration = 400; // ms

//Starting game loop
requestAnimationFrame(gameLoop);
//whole game works with this
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;  //time between frames
    lastTime = timestamp;
    time +=deltaTime; //for food pulsing

    //shake screen at gameOver
    if(shakeTime > 0){
        //shakes in the direction of collision
        Xoffset = (canvas.width - cols*gridSize)/2 + (dx * (Math.random()/2 + 0.5)) * 0.5 * gridSize;
        Yoffset = (canvas.height - rows*gridSize)/2 + (dy * (Math.random()/2 + 0.5)) * 0.5 * gridSize;

        shakeTime -= deltaTime;
    }

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(gameState === "menu"){
        startScreen();
        demoSnake(deltaTime);
    }
    else if(gameState === "settings"){
        settingsScreen();
        demoSnake(deltaTime);
    }
    else if(gameState === "playing"){
        
        updateGame(deltaTime);
        duration+=deltaTime;
        displayGame();
    }
    else if(gameState === "paused"){
        time-=deltaTime;    //food should not pulse during pause
        displayGame();
        pauseScreen();
    }
    else if(gameState === "gameOver"){
        displayGame();
        //Game Over screen after shake
        if(shakeTime <= 0) gameOverScreen();
        //sending data
        if(!scoreSent){
            fetch("http://127.0.0.1:5000/save_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: username,
                    score: score,
                    duration: Math.round(duration/1000),
                    speed: speed[speedIndex].name,
                    cause: causeOfDeath,
                    gameMode: gameMode.name,
                    gridSize: gridSize 
                })
            })
            //for debugging if needed
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));

            scoreSent = true;
        }
    }
    //resetting for shake frames
    Xoffset = (canvas.width - cols*gridSize)/2;
    Yoffset = (canvas.height - rows*gridSize)/2;

    // Make next frame  
    requestAnimationFrame(gameLoop);
}
