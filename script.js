const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake;
let food;
let direction;
let score;
let game;

function startGame() {
    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    direction = "RIGHT";
    score = 0;

    document.getElementById("score").textContent = score;

    clearInterval(game);
    game = setInterval(drawGame, 120);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }

    if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }

    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
}

function drawGame() {
    // Background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ff00" : "#00c853";

        ctx.fillRect(
            part.x,
            part.y,
            box,
            box
        );

        ctx.strokeStyle = "#111";
        ctx.strokeRect(
            part.x,
            part.y,
            box,
            box
        );
    });

    // Draw food
    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x,
        food.y,
        box,
        box
    );

    // Snake head position
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "UP") {
        headY -= box;
    }

    if (direction === "DOWN") {
        headY += box;
    }

    if (direction === "LEFT") {
        headX -= box;
    }

    if (direction === "RIGHT") {
        headX += box;
    }

    // Eating food
    if (headX === food.x && headY === food.y) {
        score++;

        document.getElementById("score").textContent = score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

    } else {
        snake.pop();
    }

    const newHead = {
        x: headX,
        y: headY
    };

    // Game over
    if (
        headX < 0 ||
        headX >= canvas.width ||
        headY < 0 ||
        headY >= canvas.height ||
        hitSelf(newHead)
    ) {
        clearInterval(game);

        alert("Game Over! Your score: " + score);
        return;
    }

    snake.unshift(newHead);
}

function hitSelf(head) {
    for (let i = 0; i < snake.length; i++) {
        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {
            return true;
        }
    }

    return false;
}

function restartGame() {
    startGame();
}

startGame();