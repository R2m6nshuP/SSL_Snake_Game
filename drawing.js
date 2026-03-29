//making grid
function displayBoard(){
    for( let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            if((i+j)%2 === 0){
                ctx.fillStyle = "#aad751";
                ctx.fillRect(Xoffset + j*gridSize, Yoffset + i*gridSize, gridSize, gridSize);
            }
            else{
                ctx.fillStyle = "#a2d149";
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
    ctx.fillText("Score: " + score, 80, 40);
}

//display Snake
function displaySnake(progress){
    for(let i=0; i<snake.length; i++){

        let curr = snake[i];
        let prev = prevSnake[i] || curr;

        let drawX = prev.x + (curr.x - prev.x) * progress;
        let drawY = prev.y + (curr.y- prev.y) * progress;

        let centerX = Xoffset + drawX * gridSize + gridSize/2;
        let centerY = Yoffset + drawY * gridSize + gridSize/2;
        let radius = gridSize * (0.5 - i * 0.01);
        radius = Math.max(radius, gridSize * 0.3);

        let t = i / snake.length;

        // dark blue to light blue
        let r = 0;
        let g = Math.floor(50 + 50 * t);   // 100 → 200
        let b = Math.floor(200 + 55 * t);    // 200 → 255

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
        displayScore(score);
        // Draw snake
        let progress = accumulator / moveDelay;
        displaySnake(progress);
}