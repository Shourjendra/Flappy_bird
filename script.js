const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = screen.height - 150;
const birdImage = new Image();
birdImage.src = "bird.png";

const pipeImage = new Image();
pipeImage.src = "pipe.png";

const bgImage = new Image();
bgImage.src = "bg.png";
let gameState = "start";
let bird;
let pipes;
let frame;
let score;
function resetGame() {
    bird = {
        x: 50,
        y: 150,
        width: 40,
        height: 30,
        gravity: 0.6,
        lift: -10,
        velocity: 0

    };
    pipes = [];
    frame = 0;
    score = 0;
}
document.addEventListener("keydown", () => {
    if (gameState == "start") {
        gameState = "playing";
        resetGame();
    }
    else if (gameState == "playing") {
        bird.velocity = bird.lift;
    }
    else if (gameState == "gameover") {
        gameState = "start"
    }
});
canvas.addEventListener("click", (e) => {
    if (gameState == "start") {
        gameState = "playing"
        resetGame();
    }
    else if (gameState == "gameover") {
        gameState = "start";
    }
    else {
        bird.velocity = bird.lift;
    }
});
function drawStart() {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
   
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Flappy Bird", 110, 200);
    ctx.font = "20px Arial";
    ctx.fillText("Click or press key to start", 70, 300);

}

function drawGameOver() {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 120, 200);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 150, 250);
    ctx.fillText("Click or press key to restart", 70, 300);
}

function drawGame() {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    ctx.drawImage(
    birdImage,
    bird.x,
    bird.y,
    bird.width,
    bird.height
);
    

    if (frame % 120 === 0) {
       
        const gap = 200;
let topHeight = Math.random() * 250 + 50;

pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: canvas.height - topHeight - gap,
    width: 50,
    passed: false
});
    }
    pipes.forEach((pipe) => {
        pipe.x -= 2;
        //top pipe

        ctx.save();
        ctx.translate(pipe.x + pipe.width/2, pipe.top/2);
        ctx.rotate(Math.PI);
        ctx.drawImage(pipeImage, -pipe.width/2, -pipe.top/2, pipe.width, pipe.top);
        ctx.restore();



        //bottom pipe       
        ctx.drawImage(pipeImage, pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
        if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x && (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)) {
            gameState = "gameover";

        }
        //score
        // if (pipe.x == bird.x) {
        //     score++;
        // };
        if (!pipe.passed && pipe.x + pipe.width < bird.x) {
           pipe.passed = true;
           score++;
        }
        if (bird.y + bird.height >= canvas.height) {
            gameState = "gameover";
        }
         //score   
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score:" + score, 10, 25);
        

    });
    frame++;

}
        function gameLoop() {
            if (gameState == "start") {
                drawStart();
            }
            else if (gameState == "playing") {
                drawGame();
            }
            else if (gameState == "gameover") {
                drawGameOver();
            }
            requestAnimationFrame(gameLoop);

        }

    bgImage.onload = function () {
        gameLoop();
    };



