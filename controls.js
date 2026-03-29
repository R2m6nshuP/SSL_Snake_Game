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
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    Click(mouseX, mouseY);
});

function Click(x, y){
    if(gameState==="menu") menuClick(x, y);
    else if(gameState==="gameOver") gameOverClick(x, y);
}

function getButton(x, y, w, h){
    return{
        x: x,
        y: y,
        w: w,
        h: h
    }
}
function buttonClick(Button, x, y){
    return (
        x >= Button.x &&
        x <= Button.x + Button.w &&
        y >= Button.y &&
        y <= Button.y + Button.h
    )
}
function menuClick(x, y){
    let playButton = getButton(Xoffset + gameSize/2 - 4*gridSize, Yoffset + gameSize/2 - gridSize, 8*gridSize, 2*gridSize);
    if(buttonClick(playButton, x, y)){
        resetGame();
        gameState = "playing";
    }
}

function gameOverClick(x, y){
    let restartButton = getButton(Xoffset + gameSize/2 - 100, Yoffset + gameSize/2 + 50, 200, 60);
    if(buttonClick(restartButton, x, y)){
        resetGame();
        gameState = "playing";
    }
}

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});