//setup before game start
function startScreen(){
displayBoard();
//play button
let playButton = getButton(Xoffset + gameSize/2 - 4*gridSize, Yoffset + gameSize/2 - gridSize, 8*gridSize, 2*gridSize);
let isHover = buttonClick(playButton, mouseX, mouseY);
ctx.fillStyle= isHover ? "#0000cc" : "blue";
ctx.fillRect(playButton.x, playButton.y, playButton.w, playButton.h);
ctx.fillStyle= "white";
ctx.textAlign= "center";
ctx.font = isHover ? "bold 32px Arial" : "30px Arial";
ctx.fillText("PLAY", playButton.x + playButton.w / 2, playButton.y + 2*playButton.h / 3 );
}

//setup at pause
function pauseScreen(){
    ctx.fillStyle = "rgba(255, 255, 255, 0.30)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.textAlign = "center";
    ctx.fillText("Press P again to resume", canvas.width/2, canvas.height/2);
}

//setup after game over
function gameOverScreen(){
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle= "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width/2, canvas.height/2 - 100);
    ctx.fillText("Score: " + score, canvas.width/2, canvas.height/2 - 50);
    if(score>highscore && !scoreSaved){
        scoreSaved=true;
        highscore=score;
        localStorage.setItem("highScore", highscore);
    }
    ctx.fillText("High Score: " + highscore, canvas.width/2, canvas.height/2);
    
    //restart button
    let restartButton = getButton(Xoffset + gameSize/2 - 100, Yoffset + gameSize/2 + 50, 200, 60);
    let isHover = buttonClick(restartButton, mouseX, mouseY);
    ctx.fillStyle= isHover ? "#0000cc" : "blue";
    ctx.fillRect(restartButton.x, restartButton.y, restartButton.w, restartButton.h);
    ctx.fillStyle= "white";
    ctx.textAlign= "center";
    ctx.font = isHover ? "bold 32px Arial" : "30px Arial";
    ctx.fillText("RESTART", restartButton.x + restartButton.w / 2, restartButton.y + 2*restartButton.h / 3 );
}

