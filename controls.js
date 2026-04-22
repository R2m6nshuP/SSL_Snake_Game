<<<<<<< HEAD
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
=======
document.addEventListener("keydown", (e) => {
    //controlling direction
    if(gameState === "playing" || true){
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

    //pausing and resuming the game
    else if(gameState === "paused" && e.key === "p"){
        gameState="playing";
    }
    else if(gameState === "playing" && e.key === "p"){
        gameState="paused";
    }

    //quitting game
    else if(gameState === "playing" && e.key === "q"){
        gameState="gameOver";
    }
});

//adding event listener to implement button's afterClick functions
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
//getting mouse coordinates
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

//temporary addition for phone
//for direction on mobile screen
let touchStartX = 0;
let touchStartY = 0;
canvas.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener("touchend", (e) => {
    let dxTouch = e.changedTouches[0].clientX - touchStartX;
    let dyTouch = e.changedTouches[0].clientY - touchStartY;

    let newDir = null;

    if(Math.abs(dxTouch) > Math.abs(dyTouch)){
        newDir = dxTouch > 0 ? "R" : "L";
    } else {
        newDir = dyTouch > 0 ? "D" : "U";
    }

    if(Dir[Dir.length - 1] !== newDir){
        Dir.push(newDir);
    }
});
//to prevent scrolling
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
}, { passive: false });
>>>>>>> Om's-branch
