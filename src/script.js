
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

// paddle object
const paddle = {
    h: 10,
    w: 75,
    x: (canvas.width - 75) / 2,
    color: "blue"
}

// controls object
const control = {
    leftPressed: false,
    rightPressed: false
}

const controlHandler = {
    up: (e) => {
        if(e.key == "Right" || e.key == "ArrowRight"){
            control.rightPressed = false
        } else if (e.key == "Left" || e.key == "ArrowLeft"){
            control.leftPressed = false
        }},
    down: (e) => {
        if(e.key == "Right" || e.key == "ArrowRight"){
            control.rightPressed = true
        } else if (e.key == "Left" || e.key == "ArrowLeft"){
            control.leftPressed = true
        }
    }
}

const drawBall = () => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2)
    ctx.fillStyle = ball.color
    ctx.fill()
    ctx.closePath()
}

const drawPaddle = () => {
    ctx.beginPath()
    ctx.rect(paddle.x, canvas.height - paddle.h, paddle.w, paddle.h)
    ctx.fillStyle = paddle.color
    ctx.fill()
    ctx.closePath()
}

const moveBall = (dx, dy) => {
    ball.x += dx
    ball.y += dy
}

const movePaddle = () => {
    if(control.rightPressed){
        paddle.x += 7
    } else if (control.leftPressed){
        paddle.x -= 7
    }
}

const checkEdgeCollision = (mode = 'default') => {
    if (ball.x + ball.dx < ball.r || ball.x + ball.dx > canvas.width-ball.r){
        ball.dx = -ball.dx
        ball.color= "yellow"
    }
    if (mode === "infinite"){
        if (ball.y + ball.dy < ball.r || ball.y + ball.dy > canvas.height-ball.r){
            ball.dy = -ball.dy
            ball.color = "red"
        }
    } else {
        if (ball.y + ball.dy < ball.r ){
            ball.dy = -ball.dy
            ball.color = "green"
        } else if (ball.y + ball.dy > canvas.height-ball.r){
            if ( ball.x > paddle.x && ball.x < paddle.x + paddle.w){
                ball.color = paddle.color
                ball.dy = -ball.dy
            } else {
                alert("GAME OVER")
                document.location.reload()
                clearInterval(interval)
            }
            
        }
    }
}



const canvasUpdate = () => {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBall()
    drawPaddle()

    movePaddle()
    checkEdgeCollision()
    moveBall(ball.dx, ball.dy)

}

// run the game
document.addEventListener("keydown", controlHandler.down, false);
document.addEventListener("keyup", controlHandler.up, false);
const interval = setInterval(canvasUpdate,10)