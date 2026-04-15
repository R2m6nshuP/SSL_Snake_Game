startScreen();
scoreSent = false;
let causeOfDeath;
let duration=0;
//variables for screen shake at gameOver
let shakeTime = 0;
let shakeDuration = 400; // ms
let shakeIntensity = 8;  // pixels

requestAnimationFrame(gameLoop);
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    time +=deltaTime;
    //shake screen at gameOver
    ctx.save();

    let shakeX = 0;
    let shakeY = 0;

    if(shakeTime > 0){
        let progress = shakeTime / shakeDuration;

    // easing (strong → weak)
        let strength = shakeIntensity * progress;

        shakeX = (Math.random() - 0.5) * 2 * strength;
        shakeY = (Math.random() - 0.5) * 2 * strength;

        shakeTime -= deltaTime;
    }

    ctx.translate(shakeX, shakeY);

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        displayGame();
        pauseScreen();
    }
    else if(gameState === "gameOver"){
        displayGame();
        gameOverScreen();
        if(!scoreSent){
            fetch("http://127.0.0.1:5000/save_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "Player",
                    score: score,
                    duration: Math.round(duration/1000),
                    speed: speed[speedIndex].name,
                    cause: causeOfDeath,
                    gameMode: gameMode.name
                })
            })
            //for debugging if needed
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));

            scoreSent = true;
        }
    }

    ctx.restore();
    // Continue loop  
    requestAnimationFrame(gameLoop);
}
