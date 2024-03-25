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

    // Teleporteer de bal naar een andere plaats
    function teleportBall() {
        const maxX = gameContainer.clientWidth - ball.offsetWidth;
        const maxY = gameContainer.clientHeight - ball.offsetHeight;

        const newLeft = Math.floor(Math.random() * maxX);
        const newTop = Math.floor(Math.random() * maxY);

        ball.style.left = newLeft + 'px';
        ball.style.top = newTop + 'px';
    }
});
