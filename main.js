startScreen();
scoreSent = false;
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
            fetch("http://127.0.0.1:5000/save-score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "Player",
                    score: score
                })
            })
            .then(res => res.json())
            .then(data => console.log(data));

            scoreSent = true;
        }
    }

    // Continue loop  
    requestAnimationFrame(gameLoop);
}