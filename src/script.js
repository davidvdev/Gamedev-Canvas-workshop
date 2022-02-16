
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// LESSON-01
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();

// LESSON-02

// ball object
const ball = {
    x: canvas.width/2,
    y: canvas.height-30,
    r: 10,
    dx: 2,
    dy: -2,
    color: "blue"
}

const drawBall = () => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2)
    ctx.fillStyle = ball.color
    ctx.fill()
    ctx.closePath()
}

const moveBall = (dx, dy) => {
    ball.x += dx
    ball.y += dy
}

const canvasUpdate = () => {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBall()

    if (ball.y + ball.dy < ball.r || ball.y + ball.dy > canvas.height-ball.r){
        ball.dy = -ball.dy
        ball.color === "blue" ? ball.color = "red" : ball.color= "blue"
    }
    if (ball.x + ball.dx < ball.r || ball.x + ball.dx > canvas.width-ball.r){
        ball.dx = -ball.dx
        ball.color === "blue" ? ball.color = "green" : ball.color= "yellow"

    }

    moveBall(ball.dx, ball.dy)

}

setInterval(canvasUpdate,10)