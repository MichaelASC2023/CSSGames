// Collaborators: Michael Luu / Abdul / Jayvon T.

// Declare Variable for Canvas Width and Height
let canvasWidth = 1520;
let canvasHeight = 725;

// Declare Variables for Initial position of Player and Attributes
let myPosX = 100;
let myPosY = 538;
let myGravity = 0.3;
let myUpwardForce = -11.64;
let myWidth = 75;
let myHeight = 75;
let myVelocity = 0;

// Enemy properties
let enemyPosX = canvasWidth - 150;
let enemyPosY = 515;
let enemyWidth = 75;
let enemyHeight = 120;
let enemyDirection = 1;
let enemyVelocity = 3.9;

// Declare r, g, b Values
let r = 255;
let g = 255;
let b = 255;

// Declare Variable for Initial state
let state = "dinosaurGame";

// Declare Variables for Player and Enemy HitBox
let myLeft, myRight, myTop, myBottom;
let enemyLeft, enemyRight, enemyTop, enemyBottom;

// Declare Variable for Score
let highScore = 0;

// Declare Variable for Timer
let lastObstacleSpawn;

function preload() {
    img = loadImage('images/dino.png');
    img2 = loadImage('images/cactus.png');
    jumpSound = loadSound("sounds/jump.mp3");
    dieSound = loadSound("sounds/die.mp3");
}
// Function begins the start countdown for random timer
function setup() {
    lastObstacleSpawn = random(0, 10000);
}

// Function spawns an enemy for the player to dodge
function spawnObstacle() {
    fill(255, 255, 255)
    rect(enemyPosX, enemyPosY, enemyWidth, enemyHeight);

    enemyPosX -= 1 * enemyVelocity
    image(img2, enemyPosX-37.5, enemyPosY-65, 85, 125);
}
// Function will create the board for the player to use
function draw() {

    // Checks if player has lost
    if (state == "lostScreen") {
        background(0);
        fill(0, 255, 0);
        textSize(100);
        textAlign(CENTER);
        text("You Lost!", 760, 365);
    } else {

    // Establishes the canvas
    createCanvas(canvasWidth, canvasHeight);
    noStroke();
    rectMode(CENTER);
    background(255);

    // Spawn Floor
    fill(0);
    rect(canvasWidth / 2, canvasHeight - 75, canvasWidth, 150)
    fill(255, 0, 0);
    textSize(50);
    textAlign(CENTER);

    // Spawn Player
    fill(255, 255, 255);
    rect(myPosX, myPosY, myWidth, myHeight);
    image(img, myPosX-37, myPosY-37, 75, 75);

    fill(70);
    text("HIGH SCORE: " + highScore, canvasWidth - 400, 70);
    fill(0, 255, 255);

    spawnObstacle();

    // Allows the player to jump in order to avoid obstacle
    jump();

    // Declaring hitboxes
    myRight = myPosX + (myWidth / 2);
    myTop = myPosY - (myHeight / 2);
    myBottom = myPosY + (myHeight / 2);
    myLeft = myPosX - (myWidth / 2);

    enemyRight = enemyPosX + (enemyWidth / 2);
    enemyLeft = enemyPosX - (enemyWidth / 2);
    enemyTop = enemyPosY - (enemyHeight / 2);
    enemyBottom = enemyPosY + (enemyHeight / 2);

    // Checks the timer to see if we should spawn an obstacle 
    checkTimer();
    // Detect Loss
    if ((myRight >= enemyLeft && myBottom >= enemyTop && myLeft <= enemyRight)) {
        state = "lostScreen";
        dieSound.play();
    }
}


function checkTimer() {
    // Checks if the time is greater than a random time we established in setup()
    if ((millis()) > lastObstacleSpawn) {
        //If true, calls to spawn obstacle
        respawn();
        lastObstacleSpawn = lastObstacleSpawn + random(0, 4000);
    }
}

function respawn() {

    // Only if the enemy has exceeded the bounds of the game
    if (enemyRight <= 0) {
        // Updates score
        highScore++;
        enemyPosX = canvasWidth+37.5;
        if (enemyVelocity <= 15) {
            // Randomizes velocity to throw off player
            enemyVelocity *= random([1.2, 1.7, 1.9])
        }
    }
}
}
// Function has working gravity mechanic which allows the player to jump
function jump() {
    myVelocity += myGravity;
    myPosY += myVelocity;

    if (myPosY > 538) {
        myVelocity = 0;
        myPosY = 538;

        if (keyIsDown(UP_ARROW)) {
            jumpSound.play();
            myVelocity += myUpwardForce;
        }
    }
}