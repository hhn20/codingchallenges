const container = document.getElementById("table-element");
const paddle1 = document.getElementById("paddle1")
const paddle2 = document.getElementById("paddle2")
const ball = document.getElementById("ball")
const step = 10;
const stepai = 2;
let offsetY = 0;
let offsetYai = 0;



document.addEventListener('keydown', (event) => {

    const containerRect = container.getBoundingClientRect();
    const paddleRect = paddle1.getBoundingClientRect();

    switch (event.key) {

        case 'w':
            offsetY -= (paddleRect.top === containerRect.top)
                ? 0
                : ((paddleRect.top - step + 1 < containerRect.top)
                    ? (-containerRect.top + paddleRect.top - 1)
                    : step);
            break;

        case 's':
            offsetY += (paddleRect.bottom === containerRect.bottom)
                ? 0
                : ((paddleRect.bottom + step + 1 > containerRect.bottom)
                    ? (containerRect.bottom - paddleRect.bottom - 1)
                    : step);
            break

    }
    paddle1.style.transform = `translate(0px, ${offsetY}px)`;

});


document.getElementById("start_button").addEventListener('click', (event) => {
    const ballRect = ball.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const paddleRect1 = paddle1.getBoundingClientRect();
    const paddleRect2 = paddle2.getBoundingClientRect();



    // Store the ball's initial position (relative to the container)
    const initialBallX = ballRect.left - containerRect.left;
    const initialBallY = ballRect.top - containerRect.top;

    console.log("Initial Position:", initialBallX, initialBallY);

    const speed = 10 + Math.random() * 3, angle = (Math.random() * 120 - 60) * (Math.PI / 180);
    // let dx = speed * Math.cos(angle)* (Math.random()<0.5 ? -1 : 1), dy = speed * Math.sin(angle)* (Math.random()<0.5 ? -1 : 1);
    let dx = 5; let dy = 2;
    let offsetX = 0;
    let offsetY = 0;
    let isPause = false;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function moveBall() {
        if (isPause) return;

        const ballRect = ball.getBoundingClientRect();
        const paddleRect1 = paddle1.getBoundingClientRect()
        const paddleRect2 = paddle2.getBoundingClientRect();

        // Ball bounces off top/bottom walls
        if (ballRect.top - 2 <= containerRect.top || ballRect.bottom + 2 >= containerRect.bottom) {
            dy = -dy;
        }

        if (ballRect.left - 2 <= paddleRect1.right && 
            ((ballRect.top >= paddleRect1.top && ballRect.top <= paddleRect1.bottom) || 
             (ballRect.bottom >= paddleRect1.top && ballRect.bottom <= paddleRect1.bottom))) {
             dx = -dx;
         }
        
        
        if (ballRect.right + 2 >= paddleRect2.left && 
            ((ballRect.top >= paddleRect2.top && ballRect.top <= paddleRect2.bottom) || 
             (ballRect.bottom >= paddleRect2.top && ballRect.bottom <= paddleRect2.bottom))) {
             dx = -dx;
         }
         
        // Ball hits left or right walls (Reset)
        if (ballRect.left - 2 <= containerRect.left || ballRect.right + 1.5 >= containerRect.right) {
            isPause = true;  // Pause movement
            dx = -dx;
            sleep(3000)
            .then(() => {
                isPause = true;  // ✅ Pause movement while resetting
        
                ball.style.position = "absolute";
                ball.style.left = ballRect.left - 2 <= containerRect.left ? `${initialBallX-1}px` : `${initialBallX - 1}px`;
                ball.style.top = `${initialBallY}px`;
                ball.style.transform = "translate(0, 0)";

        
                // Reset offsets to prevent unwanted movement
                offsetX = 0;
                offsetY = 0;
        
                return sleep(3000);  // ✅ Wait another 3 seconds after reset
            })
            .then(() => {
                const speed = 5 + Math.random() * 3, angle = (Math.random() * 120 - 60) * (Math.PI / 180);
                dx = speed * Math.cos(angle) * (Math.random()<0.5 ? -1 : 1);
                dy = speed * Math.sin(angle) * (Math.random()<0.5 ? -1 : 1);     
            })
            .then(() => {
                isPause = false;  // ✅ Resume movement **only after all delays**
            });
        
        

        }
        // Move the ball
        offsetX += dx;
        offsetY += dy;
        ball.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        
    }



    function moveRightPaddle() {
        const ballRect = ball.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const rightPaddleRect = paddle2.getBoundingClientRect();
    
        const ballCenter = (ballRect.top + ballRect.bottom) / 2;
        const rightPaddleCenter = (rightPaddleRect.top + rightPaddleRect.bottom) / 2;

        const diff = (ballRect.bottom < rightPaddleRect.top) ? 1 :(
                     (ballRect.top > rightPaddleRect.bottom) ? -1 : 0);
        
        console.log(ballRect.top, rightPaddleRect.bottom,'fffffffffff');
        // Only track the ball if it's on the right half of the container
        if (diff < 0) {
            // Move down
            offsetYai += (rightPaddleRect.bottom === containerRect.bottom)
                ? 0
                : ((rightPaddleRect.bottom + stepai + 1 > containerRect.bottom)
                    ? (containerRect.bottom - rightPaddleRect.bottom - 1)
                    : stepai);
        } else if (diff > 0) {
            // Move up
            offsetYai -= (rightPaddleRect.top === containerRect.top)
                ? 0
                : ((rightPaddleRect.top - stepai + 1 < containerRect.top)
                    ? (-containerRect.top + rightPaddleRect.top - 1)
                    : stepai);
                    
        }
        paddle2.style.transform = `translate(0px, ${offsetYai}px)`;
    }
    
    

    setInterval(() => {
        moveBall();
        moveRightPaddle();
    }, 50);
    
});
