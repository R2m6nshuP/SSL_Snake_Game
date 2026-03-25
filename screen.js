//setup before game start
function startScreen(){
    displayBoard();
    //all buttons
    menuButtons.forEach(btn => {
    btn.draw(ctx, mouseX, mouseY);
});
}

function settingsScreen(){
    displayBoard();

    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("SETTINGS", canvas.width/2, 100);
    settingsButtons[0].text = "SNAKE: " + colors[colorIndex].name;
    settingsButtons[1].text = "THEME: " + currentbg.name;
    settingsButtons[2].text = "SPEED: " + speed[speedIndex].name;

    settingsButtons.forEach(btn => {
        btn.draw(ctx, mouseX, mouseY);
    });
}

//setup at pause
function pauseScreen(){
    ctx.fillStyle = "rgba(255, 255, 255, 0.30)";
    ctx.fillRect(Xoffset, Yoffset, cols*gridSize, rows*gridSize);
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
    
    gameOverButtons.forEach(btn => {
    btn.draw(ctx, mouseX, mouseY);
});
}

