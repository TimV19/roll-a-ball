document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const gameContainer = document.getElementById('game-container');


    // Beweging van de bal
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const ballStyle = getComputedStyle(ball);
        const ballLeft = parseInt(ballStyle.left);
        const ballTop = parseInt(ballStyle.top);

        switch (key) {
            case 'ArrowUp':
                ball.style.top = (ballTop - 10) + 'px';
                break;
            case 'ArrowDown':
                ball.style.top = (ballTop + 10) + 'px';
                break;
            case 'ArrowLeft':
                ball.style.left = (ballLeft - 10) + 'px';
                break;
            case 'ArrowRight':
                ball.style.left = (ballLeft + 10) + 'px';
                break;
        
    // Update ball position
    function updateBallPosition(x, y) {
        ball.style.left = x + "px";
        ball.style.top = y + "px";
    }
    
    updateBallPosition(ballX, ballY); // Initial ball position
    
    gameContainer.addEventListener("mousemove", function(event) {
        const rect = gameContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        const buffer = 20; // Adjust this value as needed
        
        // Prevent the ball from leaving the left edge
        if (mouseX < buffer) {
            ballX = buffer;
        }
        
        // Prevent the ball from leaving the top edge
        if (mouseY < buffer) {
            ballY = buffer;
        }
        
        // Prevent the ball from leaving the right edge
        if (mouseX > rect.width - buffer) {
            ballX = rect.width - buffer;
        }
        
        // Prevent the ball from leaving the bottom edge
        if (mouseY > rect.height - buffer) {
            ballY = rect.height - buffer;
        }
        
        updateBallPosition(ballX, ballY);
    });
        }
        // Controleer winvoorwaarde
        if (checkCollision(ball, goal)) {
            alert('Gefeliciteerd! Je hebt gewonnen!');
        }
    });

    // Controleer of de bal het doel bereikt
    function checkCollision(ball, goal) {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();
        return !(ballRect.right < goalRect.left || 
                 ballRect.left > goalRect.right || 
                 ballRect.bottom < goalRect.top || 
                 ballRect.top > goalRect.bottom);
    }
});
