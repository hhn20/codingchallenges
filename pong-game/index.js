const container = document.getElementById("table-element");
const paddle = document.getElementById("paddle1")
const step = 10;
let offsetY = 0;


document.addEventListener('keydown', (event) => {

    const containerRect = container.getBoundingClientRect();
    const paddleRect = paddle.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(paddle);


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
    console.log(offsetY);

    paddle.style.transform = `translate(0px, ${offsetY}px)`;
});