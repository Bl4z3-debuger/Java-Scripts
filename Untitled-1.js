// Setup basic styles
const style = document.createElement('style');
style.innerHTML = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #56CCF2, #2F80ED);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: #fff;
        overflow: hidden;
        text-align: center;
    }

    #game-container {
        position: relative;
        width: 300px;
        height: 600px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    .platform {
        position: absolute;
        height: 20px;
        background-color: red;
        border-radius: 0; /* Sharp edges */
    }

    #stack {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    #score-container {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 20px;
        font-weight: bold;
        color: black; /* Score color */
    }

    #win-message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 30px;
        font-weight: bold;
        color: #2F80ED;
        display: none;
    }
`;
document.head.appendChild(style);

// Create the game container
let gameContainer = document.getElementById('game-container');
if (!gameContainer) {
    gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    document.body.appendChild(gameContainer);
}

// Score container
let scoreContainer = document.getElementById('score-container');
if (!scoreContainer) {
    scoreContainer = document.createElement('div');
    scoreContainer.id = 'score-container';
    scoreContainer.innerHTML = 'Score: <span id="score">0</span>';
    gameContainer.appendChild(scoreContainer);
}

// Win message
let winMessage = document.getElementById('win-message');
if (!winMessage) {
    winMessage = document.createElement('div');
    winMessage.id = 'win-message';
    winMessage.innerText = 'You Win!';
    gameContainer.appendChild(winMessage);
}

// Stack of platforms
const stack = document.createElement('div');
stack.id = 'stack';
gameContainer.appendChild(stack);

// Game variables
let platformWidth = 80;  // Initial platform width
let platformHeight = 20;  // Height of each platform
let currentPlatform = null;
let direction = 1;  // Platform movement direction: 1 is right, -1 is left
let speed = 2.5;  // Increased speed (constant)
let platforms = [];
let score = 0;
const winScore = 30;  // Updated high score to 30
let gameOver = false;
let platformMovementInterval = null; // Store the interval ID

// Create a new platform at the center of the container
function createPlatform() {
    const platform = document.createElement('div');
    platform.className = 'platform';
    platform.style.width = platformWidth + 'px';
    platform.style.left = (gameContainer.offsetWidth / 2 - platformWidth / 2) + 'px'; // Centered

    // Stack the new platform directly above the previous one
    if (platforms.length === 0) {
        platform.style.bottom = '0px'; // First platform starts at the bottom
    } else {
        const lastPlatform = platforms[platforms.length - 1];
        const lastPlatformBottom = parseInt(lastPlatform.style.bottom, 10);
        platform.style.bottom = (lastPlatformBottom + platformHeight) + 'px'; // Stack without gap
    }

    stack.appendChild(platform);
    platforms.push(platform);
    currentPlatform = platform;
}

// Move platform at constant speed
function movePlatform() {
    const platform = currentPlatform;
    if (!platform || gameOver) return;

    let left = parseInt(platform.style.left, 10);

    // Bounce off both walls with constant speed
    if (left <= 0 || left >= gameContainer.offsetWidth - platformWidth) {
        direction = -direction; // Reverse direction without changing speed
    }

    // Move the platform
    platform.style.left = left + direction * speed + 'px';
}

// Stop platform to stack it and check if the stack is successful
function stopPlatform() {
    if (platforms.length > 1) {
        const previousPlatform = platforms[platforms.length - 2];
        const currentLeft = parseInt(currentPlatform.style.left, 10);
        const previousLeft = parseInt(previousPlatform.style.left, 10);
        const offset = currentLeft - previousLeft;

        // If the offset is too large, it's a game over
        if (Math.abs(offset) >= platformWidth) {
            alert('Game Over! Click OK to restart.');
            resetGame();
            gameOver = true;
            return;
        }

        // Adjust the platform width based on the offset
        platformWidth -= Math.abs(offset);
        currentPlatform.style.width = platformWidth + 'px';
        currentPlatform.style.left = offset > 0 ? currentLeft + 'px' : previousLeft + 'px';
    }

    // Increase score and update display
    score++;
    document.getElementById('score').textContent = score;

    // If the score reaches the win score, display win message
    if (score >= winScore) {
        winMessage.style.display = 'block';
        setTimeout(() => {
            alert('You Win! Click OK to restart.');
            resetGame();
        }, 2000);
    } else {
        createPlatform();
    }
}

// Reset the game state
function resetGame() {
    // Clear the stack and platforms
    stack.innerHTML = '';
    platforms = [];
    score = 0;
    document.getElementById('score').textContent = score;
    platformWidth = 80;
    direction = 1;
    gameOver = false;

    // Clear the platform movement interval
    clearInterval(platformMovementInterval);

    // Reinitialize the game
    createPlatform();

    // Start moving the platform again
    platformMovementInterval = setInterval(movePlatform, 16); // Game speed (move every 16ms)
}

// Initialize the game
resetGame();

// Spacebar or click event to stop the platform and stack
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !gameOver) {
        stopPlatform();
    }
});

document.addEventListener('click', (event) => {
    if (!gameOver) {
        stopPlatform();
    }
});
