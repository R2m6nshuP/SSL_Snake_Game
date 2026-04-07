startScreen();
scoreSent = false;
let startTime;
let causeOfDeath;
requestAnimationFrame(gameLoop);
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    time +=deltaTime;

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(gameState === "menu"){
        startScreen();
    }
    if(gameState === "settings"){
        settingsScreen();
    }
    else if(gameState === "playing"){
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
        if(!scoreSent){
            let duration = Math.round((Date.now() - startTime)/1000)
            fetch("http://127.0.0.1:5000/save_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "Player",
                    score: score,
                    duration: duration,
                    speed: speed[speedIndex].name,
                    cause: causeOfDeath
                })
            })
            scoreSent = true;
        }
    }

    // Continue loop  
    requestAnimationFrame(gameLoop);
}