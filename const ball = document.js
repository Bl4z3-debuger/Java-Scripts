const ball = document.getElementById('ball');
document.addEventListener('keydown', handleKeyPress);

let horizontalPosition = 0;
let verticalPosition = 0;

function handleKeyPress(e) {
    if (e.code === 'KeyD') {
        horizontalPosition = horizontalPosition + 50;
    }
    if (e.code === 'KeyA') {
        horizontalPosition = horizontalPosition - 50;
    }   
    if (e.code === 'KeyW') {
        verticalPosition = verticalPosition - 50;
    }
    if (e.code === 'KeyS') {
        verticalPosition = verticalPosition + 50;
    }

    // Ensure the ball doesn't move out of bounds
    if (horizontalPosition < 0) {
        horizontalPosition = 0;
    }
    if (verticalPosition < 0) {
        verticalPosition = 0;
    }

    refresh();
}

function refresh() {
    ball.style.left = horizontalPosition + 'px';
    ball.style.top = verticalPosition + 'px';
}
