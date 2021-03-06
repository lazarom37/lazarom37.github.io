// This is a game about a rat who is gathering cheese back to their home to eat.
// Your goal is to gather as much cheese before the timer runs out while avoiding mouse traps. 
// Think carefully if you want to commit to collecting both pieces of cheese

// You earn +2 seconds every time you gather cheese back to your home
// Achievements are awarded to the player throughout the game.
// You are man's worst enemy. How long until you fall for their traps?

// Sprites and background were originally made by me with Photoshop
// Sound sources:
//      squeak.mp3 <=== https://www.myinstants.com/instant/undertale-squeak/
//      bosspain.wav <=== https://www.mariomayhem.com/downloads/sounds/super_mario_land_sound_effects.php

// Created by Marcus Lazaro, code based of HeroMonsterGame. Winter 2022, Bellevue College


// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// rat image
let ratReady = false;
let ratImage = new Image();
ratImage.onload = function () {
    ratReady = true;
};
ratImage.src = "images/rat2.png";

// cheese image
let cheeseReady = false;
let cheeseImage = new Image();
cheeseImage.onload = function () {
    cheeseReady = true;
};
cheeseImage.src = "images/cheese.png";

// trap image
let trapReady = false;
let trapImage = new Image();
trapImage.onload = function () {
    trapReady = true;
};
trapImage.src = "images/trap.png";

// ratHome image
let ratHomeReady = false;
let ratHomeImage = new Image();
ratHomeImage.onload = function () {
    ratHomeReady = true;
};
ratHomeImage.src = "images/ratHome.png";

//===============================//

// Game objects
let rat = {
    speed: 256, // movement in pixels per second
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let cheese0 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let cheese1 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let trap0 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let trap1 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let trap2 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let ratHome = {
    // for this version, the ratHome does not move, so just and x and y
    x: 0,
    y: 0
};
let cheeseCollected = 0;
let cheeseOnHand = 0;

// Handle keyboard controls
let keysDown = {
    keysDown: [] //[38 = "down"]
};
//object were we properties when keys go down
// and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down. In our game loop, we will move the rat image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    keysDown.FirstName = "Marcus";
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

//================================// FUNCTIONS

//Timer code, counts down
let timeleft = 7;
let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "GAME OVER >:C";
        GameOver();
    } else {
        document.getElementById("countdown").innerHTML = "TIME LEFT: " + timeleft;
    }
    timeleft -= 1;
}, 1000);

// Update game objects
let update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        rat.y -= rat.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        rat.y += rat.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        rat.x -= rat.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        rat.x += rat.speed * modifier;
    }

    // rat + cheese detection
    if (
        rat.x <= (cheese0.x + 64)
        && cheese0.x <= (rat.x + 62)
        && rat.y <= (cheese0.y + 64)
        && cheese0.y <= (rat.y + 42)
    ) {
        ++cheeseOnHand;
        cheese0.x = -200;
        cheese0.y = -200;
    }
    if (

        rat.x <= (cheese1.x + 64)
        && cheese1.x <= (rat.x + 62)
        && rat.y <= (cheese1.y + 64)
        && cheese1.y <= (rat.y + 42)

    ) {
        ++cheeseOnHand;
        cheese1.x = -200;
        cheese1.y = -200;
    }

    // rat + ratHome detection
    if (
        rat.x <= (ratHome.x + 64)
        && ratHome.x <= (rat.x + 62)
        && rat.y <= (ratHome.y + 64)
        && ratHome.y <= (rat.y + 42)
        && cheeseOnHand >= 1
    ) {

        cheeseCollected = cheeseCollected + cheeseOnHand; // Earned points
        soundEfx.src = "sounds/squeak.mp3"
        soundEfx.play();
        timeleft = timeleft + 3;
        reset(); // start a new cycle
    }

    // rat + trap detection
    if (
        rat.x <= (trap0.x + 64)
        && trap0.x <= (rat.x + 62)
        && rat.y <= (trap0.y + 18)
        && trap0.y <= (rat.y + 42)

        || rat.x <= (trap1.x + 64)
        && trap1.x <= (rat.x + 62)
        && rat.y <= (trap1.y + 18)
        && trap1.y <= (rat.y + 42)

        || rat.x <= (trap2.x + 64)
        && trap2.x <= (rat.x + 62)
        && rat.y <= (trap2.y + 18)
        && trap2.y <= (rat.y + 42)
    ) {
        GameOver("caught");
    }
};

// Draw everything in the main render function
let render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (ratReady) {
        ctx.drawImage(ratImage, rat.x, rat.y);
    }
    if (cheeseReady) {
        ctx.drawImage(cheeseImage, cheese0.x, cheese0.y);
        ctx.drawImage(cheeseImage, cheese1.x, cheese1.y);
    }
    if (ratHomeReady) {
        ctx.drawImage(ratHomeImage, ratHome.x, ratHome.y);
    }
    if (trapReady) {
        ctx.drawImage(trapImage, trap0.x, trap0.y);
        ctx.drawImage(trapImage, trap1.x, trap1.y);
        ctx.drawImage(trapImage, trap2.x, trap2.y);
    }
    // Score
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + cheeseCollected, 32, 32);
    ctx.fillText("On hand: " + cheeseOnHand, 32, 64);
    // Achievement badges :)
    if (cheeseCollected >= 25) {
        ctx.fillText("25 POINT MILESTONE !", 32, 96);
    }
    if (cheeseCollected >= 50) {
        ctx.fillText("50 POINT MILESTONE !!", 32, 128);
    }
    if (cheeseCollected >= 100) {
        ctx.fillText("100 POINT MILESTONE !!! (Wow, I didn't think anyone would play for this long c:)", 32, 128);
    }

}

//================================// MAIN GAME LOOP
let main = function () {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Reset the game when the player reaches ratHome
let reset = function () {
    cheeseOnHand = 0;

    rat.x = (canvas.width / 2) - 16;
    rat.y = (canvas.height / 2) - 16;

    //Place the ratHome somewhere on the screen randomly
    // but not in the hedges, Article in wrong, the 64 needs to be
    // hedge 64 + hedge 64 + char 64 = 96
    ratHome.x = 64 + (Math.random() * (canvas.width - 96));
    ratHome.y = 64 + (Math.random() * (canvas.height - 96));

    cheese0.x = 64 + (Math.random() * (canvas.width - 96));
    cheese0.y = 64 + (Math.random() * (canvas.height - 96));
    cheese1.x = 64 + (Math.random() * (canvas.width - 96));
    cheese1.y = 64 + (Math.random() * (canvas.height - 96));

    trap0.x = 64 + (Math.random() * (canvas.width - 96));
    trap0.y = 64 + (Math.random() * (canvas.height - 96));
    trap1.x = 64 + (Math.random() * (canvas.width - 96));
    trap1.y = 64 + (Math.random() * (canvas.height - 96));
    trap2.x = 64 + (Math.random() * (canvas.width - 96));
    trap2.y = 64 + (Math.random() * (canvas.height - 96));

    //makes sure nothing renders on top of the rat
    if (
        rat.x <= (trap0.x + 64)
        && trap0.x <= (rat.x + 62)
        && rat.y <= (trap0.y + 18)
        && trap0.y <= (rat.y + 42)

        || rat.x <= (trap1.x + 64)
        && trap1.x <= (rat.x + 62)
        && rat.y <= (trap1.y + 18)
        && trap1.y <= (rat.y + 42)

        || rat.x <= (trap2.x + 64)
        && trap2.x <= (rat.x + 62)
        && rat.y <= (trap2.y + 18)
        && trap2.y <= (rat.y + 42)

        || rat.x <= (ratHome.x + 64)
        && ratHome.x <= (rat.x + 62)
        && rat.y <= (ratHome.y + 64)
        && ratHome.y <= (rat.y + 42)

        || rat.x <= (cheese0.x + 64)
        && cheese0.x <= (rat.x + 62)
        && rat.y <= (cheese0.y + 64)
        && cheese0.y <= (rat.y + 42)

        || rat.x <= (cheese1.x + 64)
        && cheese1.x <= (rat.x + 62)
        && rat.y <= (cheese1.y + 64)
        && cheese1.y <= (rat.y + 42)
    ) {
        reset();
    }
};

// Game Over Function
let GameOver = function (condition) {
    if (condition === "caught") {
        alert("[GAME OVER] You got caught by the trap! You've collected " + cheeseCollected + " pieces of cheese.");
        timeleft = -1;
    } else if (condition = null) {
        alert("[GAME OVER] Times up! You've collected " + cheeseCollected + " pieces of cheese.");
        timeleft = -1;
    }
    soundEfx.src = "sounds/bosspain.wav"
    soundEfx.play();
}

// Let's play this game!
let then = Date.now();
reset();
main(); // call the main game loop.