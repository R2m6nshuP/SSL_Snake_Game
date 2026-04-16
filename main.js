let btn =document.querySelector("#confirmbtn");
let username = "playerName" ;
let introScreen = document.querySelector("#startScreen")
let flexBox = document.querySelector(".content")
let alertBox=document.createElement("h3")
alertBox.innerHTML=`<h3>Please enter a username to continue!</h3>`

btn.addEventListener("click", function(){
    username = document.querySelector("#username").value.trim();
    if(username != ""){
        introScreen.style.display = "none"; //removes the introscreen
        
    }
    else{
        flexBox.append(alertBox);

    }

})
 
 
// let gameState = "menu";
 // let lastTime = 0;
// let time = 0;
 // let accumulator = 0;
let scoreSent = false;
let startTime;
let causeOfDeath;
requestAnimationFrame(gameLoop);
function gameLoop(timestamp){
    if (lastTime === 0) lastTime = timestamp;
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    time +=deltaTime;

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(gameState === "menu"){
        startScreen();
    }
    if(gameState === "settings"){
        settingsScreen();
    }
    else if(gameState === "playing"){
        updateGame(deltaTime);
        displayGame();
    }
    else if(gameState === "paused"){
        displayGame();
        pauseScreen();
    }
    else if(gameState === "gameOver"){
        displayGame();
        gameOverScreen();
        if(!scoreSent){
            let duration = Math.round((Date.now() - startTime)/1000)
            fetch("http://127.0.0.1:5000/save_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: username,
                    score: score,
                    duration: duration,
                    speed: speed[speedIndex].name,
                    cause: causeOfDeath
                })
            })
            scoreSent = true;
        }
    }

    // Continue loop  
    requestAnimationFrame(gameLoop);
}