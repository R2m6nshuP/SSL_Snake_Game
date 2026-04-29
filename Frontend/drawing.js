//making grid
function displayBoard(){
    for( let i=0; i<rows; i++){
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
    
   // ctx.shadowBlur=20;

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
// Display the Golden Apple if active
function displaypumpkinPie() {
    if (!pumpkinPie.active) return; 

    let centerX = Xoffset + pumpkinPie.x * gridSize + gridSize/2;
    let centerY = Yoffset + pumpkinPie.y * gridSize + gridSize/2;

    // Pulse rapidly if < 2 seconds left
    let pulseSpeed = pumpkinPie.timer < 2000 ? 0.03 : 0.005;
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
//showing score
function displayScore(score){
    ctx.fillStyle = "green";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 80, 40);
}

function displayenchantedApple(){
    if(!enchantedApple.active) return;
    let centerX = Xoffset + enchantedApple.x * gridSize + gridSize/2;
    let centerY = Yoffset + enchantedApple.y * gridSize + gridSize/2;

    let pulseSpeed = enchantedApple.timer < 2000 ? 0.03 : 0.005;
    let pulse = Math.sin(time * pulseSpeed) * 0.1;  
    let radius = gridSize * (0.4 + pulse);

    ctx.save();
    
    ctx.shadowBlur=20;

    // Apple body
    ctx.shadowColor = `hsl(${Date.now() / 10 % 360}, 100%, 60%)`;
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
//display Snake
function displaySnake(progress){
    //making snake slightly transparent if ghost mode
    if(gameMode.ghost){
        ctx.globalAlpha = 0.7;
    } 
    for(let i=0; i<snake.length; i++){

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

        if(i === 0){
            ctx.shadowBlur = 20;
        } else {
            ctx.shadowBlur = 0;
        }

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
        } else {
            ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
        }
        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
         
        
        if(i === 0){
            //Eye coordinates
            let eyeOffset = gridSize * 0.18;
            let eyeRadius = gridSize * 0.2;

            let eyeX1 = centerX + (dx * gridSize * 0.2) + (Math.abs(dy) * eyeOffset);
            let eyeY1 = centerY + (dy * gridSize * 0.2) - (Math.abs(dx) * eyeOffset);
            let eyeX2 = centerX + (dx * gridSize * 0.2) - (Math.abs(dy) * eyeOffset);
            let eyeY2 = centerY + (dy * gridSize * 0.2) + (Math.abs(dx) * eyeOffset);

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
    }
}

function displayGame(){
    // Draw everything
        displayBoard();
        displayFood(food);
        displaypumpkinPie();
        displayenchantedApple();
        displayScore(score);
        if(gameState === "playing"){
            pauseButton.draw(ctx, mouseX, mouseY);
        }
        else if(gameState === "paused"){
            resumeButton.draw(ctx, mouseX, mouseY);
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
 