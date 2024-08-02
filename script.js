
const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

const gridSize = 20;

const canvasSize = 400;

canvas.width = canvasSize;

canvas.height = canvasSize;

let snake = [{ x: 100, y: 100 }];

let direction = 'RIGHT';

let food = generateFood();

document.addEventListener('keydown', changeDirection);

setInterval(updateGame, 100);

function updateGame() {

    moveSnake();

    checkCollision();

    drawGame();

}

function moveSnake() {

    const head = { ...snake[0] };

    switch (direction) {

        case 'UP': head.y -= gridSize; break;

        case 'DOWN': head.y += gridSize; break;

        case 'LEFT': head.x -= gridSize; break;

        case 'RIGHT': head.x += gridSize; break;

    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {

        food = generateFood();

    } else {

        snake.pop();

    }

}

function checkCollision() {

    const head = snake[0];

    

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {

        resetGame();

    }

    

    for (let i = 1; i < snake.length; i++) {

        if (head.x === snake[i].x && head.y === snake[i].y) {

            resetGame();

        }

    }

}

function drawGame() {

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    drawSnake();

    drawFood();

}

function drawSnake() {

    ctx.fillStyle = 'lime';

    for (const segment of snake) {

        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);

    }

}

function drawFood() {

    ctx.fillStyle = 'red';

    ctx.fillRect(food.x, food.y, gridSize, gridSize);

}

function generateFood() {

    let x, y;

    do {

        x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;

        y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;

    } while (snake.some(segment => segment.x === x && segment.y === y));

    return { x, y };

}

function changeDirection(event) {

    const newDirection = event.key.replace('Arrow', '').toUpperCase();

    if ((direction === 'UP' && newDirection !== 'DOWN') ||

        (direction === 'DOWN' && newDirection !== 'UP') ||

        (direction === 'LEFT' && newDirection !== 'RIGHT') ||

        (direction === 'RIGHT' && newDirection !== 'LEFT')) {

        direction = newDirection;

    }

}

function resetGame() {

    snake = [{ x: 100, y: 100 }];

    direction = 'RIGHT';

    food = generateFood();

}