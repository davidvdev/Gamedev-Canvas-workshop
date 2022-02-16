
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

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


// bricks object
const bricks = {
    rows: 3,
    cols: 5,
    w: 75,
    h: 20,
    pad: 10,
    offSetT: 30,
    offSetL: 30,
    color: "teal"
}

// controls object
const control = {
    leftPressed: false,
    rightPressed: false
}

// score object
const session = {
    score: 0,
    player: 'AAAAAA',
    level: 0
}

const bricksArr = []

const initBricks = () => {
    for(let c = 0; c < bricks.cols; c++){
        bricksArr[c] = [];
        for (let r = 0; r < bricks.rows; r++){
            bricksArr[c][r] = {x: 0, y: 0, status: 1}
        }
    }
}
initBricks()


const controlHandler = {
    up: (e) => {
        if(e.key == "Right" || e.key == "ArrowRight"){
            control.rightPressed = false
        } else if (e.key == "Left" || e.key == "ArrowLeft"){
            control.leftPressed = false
        }
    },
    down: (e) => {
        if(e.key == "Right" || e.key == "ArrowRight"){
            control.rightPressed = true
        } else if (e.key == "Left" || e.key == "ArrowLeft"){
            control.leftPressed = true
        }
    },
    mouse: (e) => {
        let relX = e.clientX - canvas.offsetLeft
        if(relX > 0 && relX < canvas.width){
            paddle.x = relX - paddle.w/2
        }
    }
}

// DRAWING FUNCTIONS
const drawBricks = () => {
    for (let c = 0; c < bricks.cols; c++){
        for (let r = 0; r < bricks.rows; r++){
            if(bricksArr[c][r].status === 1) {
                const brickX = (c * (bricks.w + bricks.pad)) + bricks.offSetL
                const brickY = (r * (bricks.h + bricks.pad)) + bricks.offSetT
                bricksArr[c][r].x = brickX
                bricksArr[c][r].y = brickY
                ctx.beginPath()
                ctx.rect(brickX, brickY, bricks.w, bricks.h)
                ctx.fillStyle = bricks.color
                ctx.fill()
                ctx.closePath()
            }
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

const drawScore = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = paddle.color
    ctx.fillText("Score: " + session.score, 8, 20)
}

// MOVEMENT FUNCTIONS
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

// COLLISION FUNCTIONS
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

const checkBrickCollision = () => {
    for(let c = 0; c < bricks.cols; c++){
        for (let r = 0; r < bricks.rows; r++){
            let brick = bricksArr[c][r]
            if(brick.status === 1) {
                if( ball.x > brick.x && ball.x < brick.x + bricks.w && ball.y > brick.y && ball.y < brick.y + bricks.h){
                    ball.dy = -ball.dy
                    brick.status = 0
                    session.score++
                    if (session.score === bricks.rows * bricks.cols) {
                        alert("YOU WIN! CONGRATULATIONS!")
                        document.location.reload()
                        clearInterval(interval)
                    }

                }
            }
            
        }
    }
}

// RUN THE GAME
const canvasUpdate = () => {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawScore()
    drawBricks()
    drawBall()
    drawPaddle()

    movePaddle()
    checkEdgeCollision()
    moveBall(ball.dx, ball.dy)
    checkBrickCollision()

}

document.addEventListener("keydown", controlHandler.down, false);
document.addEventListener("keyup", controlHandler.up, false);
document.addEventListener('mousemove', controlHandler.mouse, false)
const interval = setInterval(canvasUpdate,10)