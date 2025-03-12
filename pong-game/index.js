const container = document.getElementById("table-element");
const paddle = document.getElementById("paddle1")
const ball = document.getElementById("ball")
const step = 10;
let offsetY = 0;



document.addEventListener('keydown', (event) => {

    const containerRect = container.getBoundingClientRect();
    const paddleRect = paddle.getBoundingClientRect();

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
    paddle.style.transform = `translate(0px, ${offsetY}px)`;

});



document.getElementById("start_button").addEventListener('click', (event) => {
    const ballRect = ball.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const paddleRect = paddle.getBoundingClientRect();


    // Store the ball's initial position (relative to the container)
    const initialBallX = ballRect.left - containerRect.left;
    const initialBallY = ballRect.top - containerRect.top;

    console.log("Initial Position:", initialBallX, initialBallY);

    let dx = -5; // Randomize left or right
    // let dy = 5 * (Math.random() < 0.5 ? -1 : 1); // Randomize up or down
    let dy = 0
    let offsetX = 0;
    let offsetY = 0;
    let isPause = false;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function moveBall() {
        if (isPause) return;

        const ballRect = ball.getBoundingClientRect();
        const paddleRect = paddle.getBoundingClientRect()

        // Ball bounces off top/bottom walls
        if (ballRect.top - 2 <= containerRect.top || ballRect.bottom + 2 >= containerRect.bottom) {
            dy = -dy;
        }

        if (ballRect.left - 2 <= paddleRect.right && 
            ((ballRect.top >= paddleRect.top && ballRect.top <= paddleRect.bottom) || 
             (ballRect.bottom >= paddleRect.top && ballRect.bottom <= paddleRect.bottom))) {
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
                dx = 5 * (Math.random() < 0.5 ? -1 : 1); // Randomize left/right direction
                dy = 5 * (Math.random() < 0.5 ? -1 : 1); // Randomize up/down direction        
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

    setInterval(moveBall, 50);
});
