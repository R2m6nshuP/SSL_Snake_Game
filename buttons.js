class Button {
    constructor(x, y, w, h, text, onClick){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.onClick = onClick;
    }
    //bool function to check if mouse is on button
    Hover(x, y){
        return (
            x >= this.x &&
            x <= this.x + this.w &&
            y >= this.y &&
            y <= this.y + this.h
        );
    }
    //drawing the button
    draw(ctx, mouseX, mouseY){
        let isHover = this.Hover(mouseX, mouseY);
        let grd = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "#db9292");
        ctx.fillStyle = grd;   //giving vertical gradient to buttons
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.w, this.h, this.h/3);   //last parameter is radius of rounded edges
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = isHover ? "bold 32px Arial" : "30px Arial";
        ctx.textBaseline = "middle";    //for mid point of text = mid point of button
        ctx.fillText(this.text, this.x + this.w/2, this.y + this.h/2);
    }
    //defining action after clicking the button
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
let playScreenButtons = [];

//some types and their indexes are defined, so that later if we want to add more elements just append it to the respective objects

//for Game Mode
//obstacles can be added in future
let gameModes = [
    {name: "CLASSIC", wrap: false, ghost: false, obstacle: false},
    {name: "WRAPPED", wrap: true, ghost: false, obstacle: false},
    {name: "GHOST", wrap: false, ghost: true, obstacle: false},
    {name: "FOREVER", wrap: true, ghost: true, obstacle: false}
]
let gameModeIndex = 0;
let gameMode=gameModes[0];

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
    {name: "FAST", val: 65},
    {name: "HELLMODE", val: 100}
];
let speedIndex = 0;

//for gridsize
let gridSizes = [20, 30, 40, 50];
let gridIndex = 1; //default=30
function updateGrid(){
    gridSize = gridSizes[gridIndex];
    cols = Math.floor(gameWidth / gridSize);
    rows = Math.floor(gameHeight / gridSize);

    Xoffset = (canvas.width - cols*gridSize)/2;
    Yoffset = (canvas.height - rows*gridSize)/2;

    demoReset();        // reset snake properly
}

//as name suggests
function setupButtons(){
    //x and y for setting up buttons relative to middle of screen
    let x = Xoffset + cols*gridSize/2;
    let y = Yoffset + rows*gridSize/2;
    let btnW = Math.min(300, canvas.width * 0.25);
    let btnH = Math.min(80, canvas.height * 0.08);
    

    menuButtons = [
        new Button(x - btnW/2, y - btnH, btnW, btnH, "PLAY", () => {
            resetGame();
            gameState = "playing";
        }),

        new Button(x - btnW/2, y + btnH/2, btnW, btnH, "SETTINGS", () => {
            gameState = "settings";
        }),

        new Button(x - btnW/2, y + 2*btnH, btnW, btnH, "NORMAL", () => {
            gameModeIndex = (gameModeIndex + 1) % gameModes.length;
            gameMode = gameModes[gameModeIndex];
        }),
    ];

    settingsButtons = [
        new Button(x - btnW/2, y - 9*btnH/3.5, btnW, btnH, "SNAKE: BLUE", () => {
            colorIndex = (colorIndex + 1) % colors.length;
            snakeColor = colors[colorIndex].val;
        }),

        new Button(x - btnW/2, y - 4*btnH/3.5, btnW, btnH, "THEME: CLASSIC", () => {
            bgIndex = (bgIndex + 1) % bg.length;
            currentbg = bg[bgIndex];
        }),

        new Button(x - btnW/2, y + 1*btnH/3.5, btnW, btnH, "SPEED: SLOW", () => {
            speedIndex = (speedIndex + 1) % speed.length;
            moveDelay = speed[speedIndex].val * (gridSize/30);  //to have same speed even with grid change
            //moveDelay signifies time and gridSize is distance so distance/time should be same
        }),

        new Button(x - btnW/2, y + 6*btnH/3.5, btnW, btnH, "GRID: 30", () => {
            gridIndex = (gridIndex+1) % gridSizes.length;
            gridSize = gridSizes[gridIndex];
            updateGrid();
            demoReset();
        }),

        new Button(x - btnW/2, y + 11*btnH/3.5, btnW, btnH, "BACK", () => {
            gameState = "menu";
        })
    ];

    playScreenButtons = [
    new Button(Xoffset + cols*gridSize - btnW, Yoffset/8, btnW, 3*Yoffset/4, "PAUSE", () => {
        gameState = "paused";
    }),

    new Button(Xoffset + cols*gridSize - btnW, Yoffset/8, btnW, 3*Yoffset/4, "RESUME", () => {
        gameState = "playing";
    }),

    new Button(Xoffset + cols*gridSize - 2.2*btnW, Yoffset/8, btnW, 3*Yoffset/4, "QUIT", () => {
        gameState = "gameOver";
    })
    ];

    gameOverButtons = [
        new Button(x - btnW/2, y + btnH, btnW, btnH, "RESTART", () => {
            resetGame();
            gameState = "playing";
        }),

        new Button(x - btnW/2, y + 5*btnH/2, btnW, btnH, "MENU", () => {
            resetGame();
            //for demosnake
            demoReset();
            gameState = "menu";
        })
    ];
}

setupButtons();
