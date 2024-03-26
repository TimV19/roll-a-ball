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

    game-container.addEventListener("ballmove", function(event) {
        const rect = game-container.getBoundingClientRect();
        const ballX = event.clientX - rect.left;
        const ballY = event.clientY - rect.top;
        
        const buffer = 20; // Adjust this value as needed
        
        // Prevent the ball from leaving the left edge
        if (ballX < buffer) {
            window.scrollTo(window.scrollX - 5, window.scrollY);
        }
        
        // Prevent the ball from leaving the top edge
        if (ballY < buffer) {
            window.scrollTo(window.scrollX, window.scrollY - 5);
        }
        
        // Prevent the ball from leaving the right edge
        if (ball > rect.width - buffer) {
            window.scrollTo(window.scrollX + 5, window.scrollY);
        }
        
        // Prevent the ball from leaving the bottom edge
        if (ball > rect.height - buffer) {
            window.scrollTo(window.scrollX, window.scrollY + 5);
    }
});
