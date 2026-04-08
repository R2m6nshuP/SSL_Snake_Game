document.addEventListener("keydown", (e) => {
    //controlling direction
    if(gameState === "playing"){
        let newDir = null;
        if(e.key === "ArrowUp" || e.key === "w") newDir = "U";
        if(e.key === "ArrowDown" || e.key === "s") newDir = "D";
        if(e.key === "ArrowRight" || e.key === "d") newDir = "R";
        if(e.key === "ArrowLeft" || e.key === "a") newDir = "L";

        if(Dir[Dir.length - 1] !== newDir && newDir){
            Dir.push(newDir);
        }
    }

    //starting the game
    if(gameState === "menu" && e.key === "Enter"){ 
        resetGame();
        gameState="playing"; 
    }

    //restarting game
    else if(gameState === "gameOver" && e.key === "r"){
        resetGame();
        gameState="playing";
    }

    //settings
    else if(gameState === "settings" && e.key === "Escape"){
        gameState="menu";
    }

    //pausing the game
    else if(gameState === "paused" && e.key === "p"){
        gameState="playing";
    }
    else if(gameState === "playing" && e.key === "p"){
        gameState="paused";
    }
});

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();

    // Mouse position inside canvas
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;

    if(gameState === "menu"){
        menuButtons.forEach(btn => btn.afterClick(mx, my));
    }
    else if(gameState === "settings"){
        settingsButtons.forEach(btn => btn.afterClick(mx, my));
    }
    else if(gameState === "gameOver"){
        gameOverButtons.forEach(btn => btn.afterClick(mx, my));
    }
    else if(gameState === "playing"){
        pauseButton.afterClick(mx, my);
    }
    else if(gameState === "paused"){
        resumeButton.afterClick(mx, my);
    }
});

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});