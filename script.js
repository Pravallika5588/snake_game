// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the snake
let snake = [{x: 50, y: 50}];  // Snake starts with a single segment
let snakeDirection = 'right';   // Default direction
let food = generateFood();     // Initial food position
let score = 0;
let highScore=0;
let gameInterval;
let gameOver = false;

// Key press handling for controlling the snake
document.addEventListener('keydown', changeDirection);

// Start or restart the game
document.getElementById('restartBtn').addEventListener('click', restartGame);

  // Function to simulate starting the game
  function startGame() {
    document.body.innerHTML = "<h2 style='text-align: center; color: white;'>Game Starting...</h2>";
    
    // Here you would initiate your snake game, such as loading game logic or a canvas element
    // For example, redirecting to another game screen or initializing the game canvas.
    
    // For demo purposes, we can simulate a transition after a delay.
  }



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
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').classList.remove('d-none');
}

// Draw the game (snake, food, score)
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Draw the snake
    ctx.fillStyle = 'yellow';
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




    ctx.fillStyle = 'white' ;
    ctx.font = '16px Arial';
    ctx.fillText('highscore: ' + highScore, 300, 20);
    highScore=score >= highScore? score: highScore;
    
}

// Restart the game
function restartGame() {
    snake = [{ x: 50, y: 50 }];
    snakeDirection = 'right';
    food = generateFood();
    score = 0;
    gameOver = false;
    document.getElementById('gameOver').classList.add('d-none');
    gameInterval = setInterval(gameLoop, 100);
}

// Initialize the game
gameInterval = setInterval(gameLoop, 100);
