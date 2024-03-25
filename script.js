document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    let goal = document.getElementById('goal');
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
        const collision = checkCollision(ball, goal);
        if (collision.collided) {
            alert('Gefeliciteerd! Je hebt gewonnen!');
            // Update goal position
            updateGoalPosition(collision.direction);
        }
    });

    // Controleer of de bal het doel bereikt
    function checkCollision(ball, goal) {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();
        
        const collision = {
            collided: !(ballRect.right < goalRect.left || 
                        ballRect.left > goalRect.right || 
                        ballRect.bottom < goalRect.top || 
                        ballRect.top > goalRect.bottom),
            direction: ""
        };

        // Determine collision direction
        if (collision.collided) {
            const ballCenterX = ballRect.left + ballRect.width / 2;
            const ballCenterY = ballRect.top + ballRect.height / 2;
            const goalCenterX = goalRect.left + goalRect.width / 2;
            const goalCenterY = goalRect.top + goalRect.height / 2;

            const deltaX = ballCenterX - goalCenterX;
            const deltaY = ballCenterY - goalCenterY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                collision.direction = deltaX > 0 ? "right" : "left";
            } else {
                collision.direction = deltaY > 0 ? "bottom" : "top";
            }
        }

        return collision;
    }

    // Update goal position
    function updateGoalPosition(direction) {
        const goalStyle = getComputedStyle(goal);
        const goalLeft = parseInt(goalStyle.left);
        const goalTop = parseInt(goalStyle.top);

        const step = 10; // You can adjust the step size as needed

        switch (direction) {
            case "top":
                goal.style.top = (goalTop - step) + 'px';
                break;
            case "bottom":
                goal.style.top = (goalTop + step) + 'px';
                break;
            case "left":
                goal.style.left = (goalLeft - step) + 'px';
                break;
            case "right":
                goal.style.left = (goalLeft + step) + 'px';
                break;
        }
    }
});
