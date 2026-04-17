//making grid
function displayBoard(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            if((i+j)%2 === 0){
                ctx.fillStyle = currentbg.light;
                ctx.fillRect(Xoffset + j*gridSize, Yoffset + i*gridSize, gridSize, gridSize);
            }
            else{
                ctx.fillStyle = currentbg.dark;
                ctx.fillRect(Xoffset + j*gridSize, Yoffset + i*gridSize, gridSize, gridSize);
            }
        }
    }
}

//displaying food
function displayFood(food){
    let centerX = Xoffset + food.x * gridSize + gridSize/2;
    let centerY = Yoffset + food.y * gridSize + gridSize/2;

    let pulse = Math.sin(time * 0.005) * 0.1; // smooth animation
    let radius = gridSize * (0.4 + pulse);

    ctx.save();
    
    ctx.shadowBlur=20;

    // Apple body
    ctx.shadowColor="red";
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Stem
    ctx.shadowColor="brown";
    ctx.fillStyle = "brown";
    ctx.fillRect(centerX - 2, centerY - radius - 5, 4, 8);

    // Leaf
    ctx.shadowColor="green";
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.ellipse(centerX + 5, centerY - radius - 5, 6, 3, Math.PI/4, 0, Math.PI*2);
    ctx.fill();

    ctx.restore();
}

//showing score
function displayScore(score){
    ctx.fillStyle = "green";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, Xoffset, Yoffset/2);
}

//eyes
function drawEyes(X, Y){
    //Eye coordinates
    let eyeOffset = gridSize * 0.18;
    let eyeRadius = gridSize * 0.2;

    let eyeX1 = X + (dx * gridSize * 0.2) + (Math.abs(dy) * eyeOffset);
    let eyeY1 = Y + (dy * gridSize * 0.2) - (Math.abs(dx) * eyeOffset);
    let eyeX2 = X + (dx * gridSize * 0.2) - (Math.abs(dy) * eyeOffset);
    let eyeY2 = Y + (dy * gridSize * 0.2) + (Math.abs(dx) * eyeOffset);

    //Eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(eyeX1, eyeY1, eyeRadius, 0, Math.PI * 2);
    ctx.arc(eyeX2, eyeY2, eyeRadius, 0, Math.PI * 2);
    ctx.fill();

    //Pupils
    ctx.fillStyle = "black";
        
    let pupilOffset = eyeRadius * 0.4;

    let pupilX1 = eyeX1 + dx * pupilOffset;
    let pupilY1 = eyeY1 + dy * pupilOffset;
    let pupilX2 = eyeX2 + dx * pupilOffset;
    let pupilY2 = eyeY2 + dy * pupilOffset;

    ctx.beginPath();
    ctx.arc(pupilX1, pupilY1, eyeRadius * 0.5, 0, Math.PI * 2);
    ctx.arc(pupilX2, pupilY2, eyeRadius * 0.5, 0, Math.PI * 2);
    ctx.fill();
}
//display Snake
function displaySnake(progress){
    //making snake slightly transparent if ghost mode
    if(gameMode.ghost){
        ctx.globalAlpha = 0.7;
    }
    //i-- because in ghost mode head should be on top of other body while overlapping
    for(let i=snake.length-1; i>=0; i--){

        let curr = snake[i];
        let prev = prevSnake[i] || curr;
        if(Math.abs(prev.x - curr.x) > 1 || Math.abs(prev.y - curr.y) > 1) prev = curr; //if passing through walls
        
        let drawX = prev.x + (curr.x - prev.x) * progress;
        let drawY = prev.y + (curr.y- prev.y) * progress;


        let centerX = Xoffset + drawX * gridSize + gridSize/2;
        let centerY = Yoffset + drawY * gridSize + gridSize/2;
        let radius = gridSize * (0.5 - i * 0.01);
        radius = Math.max(radius, gridSize * 0.3);

        let t = i / snake.length;

        // dark to light
        let r = Math.floor(snakeColor.r*(0.5 + 0.5*t));
        let g = Math.floor(snakeColor.g*(0.5 + 0.5*t));
        let b = Math.floor(snakeColor.b*(0.5 + 0.5*t));

        if(!gameMode.ghost) ctx.shadowBlur=20;
        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur=0;

        // Drawing Eyes
        if(i === 0){
            drawEyes(centerX, centerY);
        }
    }
    ctx.globalAlpha = 1;
}

function displayGame(){
    // Draw everything
    displayBoard();
    displayFood(food);
    displayScore(score);
    //pause, resume and quit buttons
    if(gameState === "playing"){
        playScreenButtons[0].draw(ctx, mouseX, mouseY);
        playScreenButtons[2].draw(ctx, mouseX, mouseY);
    }
    else if(gameState === "paused"){
        playScreenButtons[1].draw(ctx, mouseX, mouseY);
        playScreenButtons[2].draw(ctx, mouseX, mouseY);
    }
    
    // Draw snake
    let progress = accumulator / moveDelay;
    displaySnake(progress);
}

function demoSnake(deltaTime){
    updateGame(deltaTime);
    let progress = accumulator / moveDelay;
    displaySnake(progress);
}
