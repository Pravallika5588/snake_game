// Get elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameContainer = document.getElementById('gameContainer');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameOverScreen = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');

// Define the snake
let snake = [{x: 50, y: 50}];
let snakeDirection = 'right';
let food = generateFood();
let score = 0;
let highScore = 0;
let gameInterval;
let gameOver = false;

// Key press handling for controlling the snake
document.addEventListener('keydown', changeDirection);

// Start or restart the game
restartBtn.addEventListener('click', restartGame);
startBtn.addEventListener('click', startGame);

// Game loop
function gameLoop() {
    if (gameOver) return;

    moveSnake();
    checkCollisions();
    drawGame();
}

// Change snake's direction based on user input
function changeDirection(event) {
    if (gameOver) return;

    if (event.key === 'ArrowUp' && snakeDirection !== 'down') {
        snakeDirection = 'up';
    } else if (event.key === 'ArrowDown' && snakeDirection !== 'up') {
        snakeDirection = 'down';
    } else if (event.key === 'ArrowLeft' && snakeDirection !== 'right') {
        snakeDirection = 'left';
    } else if (event.key === 'ArrowRight' && snakeDirection !== 'left') {
        snakeDirection = 'right';
    }
}

// Move the snake based on its current direction
function moveSnake() {
    const head = { ...snake[0] };

    if (snakeDirection === 'up') {
        head.y -= 10;
    } else if (snakeDirection === 'down') {
        head.y += 10;
    } else if (snakeDirection === 'left') {
        head.x -= 10;
    } else if (snakeDirection === 'right') {
        head.x += 10;
    }

    snake.unshift(head);

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();  // Generate new food
    } else {
        snake.pop();  // Remove the last segment
    }
}

// Generate a random food position
function generateFood() {
    const foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    const foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    return { x: foodX, y: foodY };
}

// Check for collisions (walls and self)
function checkCollisions() {
    const head = snake[0];

    // Check wall collisions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

// End the game and show the game over screen
function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    finalScore.textContent = score;
    gameOverScreen.classList.remove('d-none');
}

// Draw the game (snake, food, score)
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Draw the snake
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
    
    // Update and display high score
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText('Highscore: ' + highScore, 300, 20);
    highScore = score >= highScore ? score : highScore;
}

// Restart the game
function restartGame() {
    snake = [{ x: 50, y: 50 }];
    snakeDirection = 'right';
    food = generateFood();
    score = 0;
    gameOver = false;
    gameOverScreen.classList.add('d-none');
    gameInterval = setInterval(gameLoop, 100);
}

// Start the game (hide start screen and show canvas)
function startGame() {
    startScreen.classList.add('d-none');
    gameContainer.classList.remove('d-none');
    gameInterval = setInterval(gameLoop, 100);
}

// Initialize the game (game loop starts after start)
