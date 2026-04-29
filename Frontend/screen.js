function startScreen(){
    displayBoard();
    
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("SNAKE GAME", canvas.width/2, Yoffset/2);
    //updating button text
    menuButtons[2].text = gameMode.name;

    //all menu buttons
    menuButtons.forEach(btn => {
    btn.draw(ctx, mouseX, mouseY);
    });
}

function settingsScreen(){
    displayBoard();
    
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("SETTINGS", canvas.width/2, Yoffset/2);
    //updating button text
    settingsButtons[0].text = "SNAKE: " + colors[colorIndex].name;
    settingsButtons[1].text = "THEME: " + currentbg.name;
    settingsButtons[2].text = "SPEED: " + speed[speedIndex].name;
    settingsButtons[3].text = "GRID: " + gridSizes[gridIndex];

    //all settings buttons
    settingsButtons.forEach(btn => {
        btn.draw(ctx, mouseX, mouseY);
    });
}

function pauseScreen(){
    ctx.fillStyle = "rgba(255, 255, 255, 0.30)";
    ctx.fillRect(Xoffset, Yoffset, cols*gridSize, rows*gridSize);
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.textAlign = "center";
    ctx.fillText("Press P again to resume", canvas.width/2, canvas.height/2);
}

function gameOverScreen(){
    //transparent white screen
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //gameOver panel
    let panelW = Math.min(500, canvas.width * 0.4);
    let panelH = gameHeight - gridSize;
    let px = canvas.width/2 - panelW/2;
    let py = canvas.height/2 - panelH/2;
    let grd = ctx.createLinearGradient(px, py, px, py + panelH);
    grd.addColorStop(0, "#ffffff");
    grd.addColorStop(0.05, "#191717");
    grd.addColorStop(0.95, "#292828");
    grd.addColorStop(1, "#ffffff");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.roundRect(px, py, panelW, panelH, panelH/10);
    ctx.fill();

    //title
    ctx.fillStyle= "#ff4d4d";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width/2, py + panelH/10);

    //updating highscore
    if(score>highscore){
        ctx.fillStyle = "gold";
        highscore=score;
    }

    //other data
    ctx.fillStyle = (score === highscore)? "gold" : "white";
    ctx.font = (score === highscore)? "bold 20px Arial" : "20px Arial";

    ctx.fillText(`Score: ${score}`, canvas.width/2, py + 2*panelH/10);
    ctx.fillText(`High Score: ${highscore}`, canvas.width/2, py + 2.75*panelH/10);
    ctx.fillText(`Cause: ${causeOfDeath}`, canvas.width/2, py + 3.5*panelH/10);
    ctx.fillText(`Time: ${Math.round(duration/1000)}s`, canvas.width/2, py + 4.25*panelH/10);
    ctx.fillText(`Mode: ${gameMode.name}`, canvas.width/2, py + 5*panelH/10);
    gameOverButtons.forEach(btn => {
        btn.draw(ctx, mouseX, mouseY);
    });
}
