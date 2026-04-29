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
function displayApple(){
    if(!food[0].active) return;

    let centerX = Xoffset + food[0].x * gridSize + gridSize/2;
    let centerY = Yoffset + food[0].y * gridSize + gridSize/2;

    let pulse = Math.sin(time * 0.005) * 0.1; // smooth animation
    let radius = gridSize * (0.4 + pulse);

    //drawing apple
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
function displayPie(){
    if (!food[1].active) return; 

    let centerX = Xoffset + food[1].x * gridSize + gridSize/2;
    let centerY = Yoffset + food[1].y * gridSize + gridSize/2;

    // Pulse rapidly if < 2 seconds left
    let pulseSpeed = food[1].timer < 2000 ? 0.03 : 0.005;
    let pulse = Math.sin(time * pulseSpeed) * 0.1; 
    let radius = gridSize * (0.4 + pulse);

    ctx.save();
    ctx.shadowBlur = 20;

     // pie
    ctx.shadowColor = "rgb(160, 70, 20)";
    ctx.fillStyle = "rgb(195, 85, 35)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // crust  
    ctx.shadowColor = "rgb(150, 90, 40)";
    ctx.strokeStyle = "rgb(175, 105, 45)";
    ctx.lineWidth = radius * 0.12;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - radius * 0.06, 0, Math.PI * 2);
    ctx.stroke();

    //  cream  
    ctx.shadowColor = "rgba(200, 190, 160, 0.4)";
    ctx.fillStyle = "rgb(255, 252, 240)";
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius * 0.22, radius * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}
function displayGoldenApple(){
    if(!food[2].active) return;
    let centerX = Xoffset + food[2].x * gridSize + gridSize/2;
    let centerY = Yoffset + food[2].y * gridSize + gridSize/2;

    let pulseSpeed = food[2].timer < 2000 ? 0.03 : 0.005;
    let pulse = Math.sin(time * pulseSpeed) * 0.1;  
    let radius = gridSize * (0.4 + pulse);

    ctx.save();
    
    ctx.shadowBlur=20;

    // Apple body
    ctx.shadowColor = `hsl(${time / 10 % 360}, 100%, 60%)`;
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Stem
    ctx.fillStyle = "#5a3d1e";
    ctx.fillRect(centerX - 2, centerY - radius - 5, 4, 8);

    // Leaf
    ctx.fillStyle = "#2ecc71";
    ctx.beginPath();
    ctx.ellipse(centerX + 5, centerY - radius - 5, 6, 3, Math.PI/4, 0, Math.PI*2);
    ctx.fill();

    ctx.restore();
}
function displayFood(){
    displayApple();
    displayPie();
    displayGoldenApple();
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

        if (isEnchanted) {
            // blinks rapidly to show enchanted mode is on
            if (Math.floor(time / 175) % 2 === 0) {
                r = Math.floor(242*(1+ 0.5*t));
                g = Math.floor(203*(1 + 0.5*t));
                b = Math.floor(4*(1+ 0.5*t));
                ctx.shadowColor = "gold";
            } else {
                r = Math.floor(255*(0.8 + 0.5*t));
                g = Math.floor(255*(0.8 + 0.5*t));
                b = Math.floor(255*(0.8+ 0.5*t));
                ctx.shadowColor = "white";
            }
        } 
        else{
            ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
        }
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
    displayFood();
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
