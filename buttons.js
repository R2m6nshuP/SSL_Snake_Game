class Button {
    constructor(x, y, w, h, text, onClick){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.onClick = onClick;
    }
    Hover(x, y){
        return (
            x >= this.x &&
            x <= this.x + this.w &&
            y >= this.y &&
            y <= this.y + this.h
        );
    }
    draw(ctx, mouseX, mouseY){
        let isHover = this.Hover(mouseX, mouseY);
        ctx.fillStyle = isHover ? "#0000cc" : "blue";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = isHover ? "bold 32px Arial" : "30px Arial";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + this.w/2, this.y + this.h/2);
    }
    afterClick(mx, my){
        if(this.Hover(mx, my)){
            this.onClick();
        }
    }
}

//buttons
let menuButtons = [];
let settingsButtons = [];
let gameOverButtons = [];
let pauseButton = new Button(Xoffset + gameSize + 10, 10, 4*gridSize, 2*gridSize, "PAUSE", () => {
    gameState = "paused";
});
let resumeButton = new Button(Xoffset + gameSize + 10, 10, 6*gridSize, 2*gridSize, "RESUME", () => {
    gameState = "playing";
});
//for snake color
let colors = [
    {name: "BLUE", val: {r:0,g:100,b:255}},
    {name: "RED", val: {r:255,g:80,b:0}},
    {name: "GREEN", val: {r:80,g:200,b:120}}
];
let colorIndex = 0;
let snakeColor = colors[0].val;
//for background
let bg = [
    {name: "CLASSIC", light: "#aad751", dark:"#a2d149"},
    {name: "DARK", light: "#222", dark:"#111"},
    {name: "NEON", light: "#00ffff", dark:"#e0ffff"}
];
let bgIndex = 0;
let currentbg = bg[0];

//for speed
let speed = [
    {name: "SLOW", val: 200},
    {name: "MEDIUM", val: 130},
    {name: "FAST", val: 50},
    {name: "HELLMODE", val: 100}
];
let speedIndex = 0;

function setupButtons(){
    let x = Xoffset + gameSize/2;
    let y = Yoffset + gameSize/2;

    menuButtons = [
        new Button(x - 5*gridSize, y - gridSize, 10*gridSize, 2*gridSize, "PLAY", () => {
            resetGame();
            gameState = "playing";
        }),

        new Button(x - 5*gridSize, y + 2*gridSize, 10*gridSize, 2*gridSize, "SETTINGS", () => {
            gameState = "settings";
        }),
    ];

    settingsButtons = [
        new Button(x - 5*gridSize, y - gridSize, 10*gridSize, 2*gridSize, "SNAKE: BLUE", () => {
            colorIndex = (colorIndex + 1) % colors.length;
            snakeColor = colors[colorIndex].val;
        }),

        new Button(x - 5*gridSize, y + 2*gridSize, 10*gridSize, 2*gridSize, "THEME: CLASSIC", () => {
            bgIndex = (bgIndex + 1) % bg.length;
            currentbg = bg[bgIndex];
        }),

        new Button(x - 5*gridSize, y + 5*gridSize, 10*gridSize, 2*gridSize, "SPEED: SLOW", () => {
            speedIndex = (speedIndex + 1) % speed.length;
            moveDelay = speed[speedIndex].val;
        }),

        new Button(x - 5*gridSize, y + 8*gridSize, 10*gridSize, 2*gridSize, "BACK", () => {
            gameState = "menu";
        })
    ];

    gameOverButtons = [
        new Button(x - 5*gridSize, y + 2*gridSize, 10*gridSize, 2*gridSize, "RESTART", () => {
            resetGame();
            gameState = "playing";
        }),

        new Button(x - 5*gridSize, y + 5*gridSize, 10*gridSize, 2*gridSize, "MENU", () => {
            resetGame();
            gameState = "menu";
        })
    ];
}

setupButtons();