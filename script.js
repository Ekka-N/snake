const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// const width = canvas.width;
// const height = canvas.height;
const blockSize = 32;
// const bloksByWidth = width / blockSize;
// const bloksByHeight = height / blockSize;
let score = 0;
let food = {
    x: Math.floor(Math.random() * 17 + 1) * blockSize,
    y: Math.floor(Math.random() * 15 + 3) * blockSize
};
let snake = [];
snake[0] = {
    x: 9 * blockSize,
    y: 10 * blockSize
}

const ground = new Image();
ground.src = './img/field.png';

const foodImg = new Image();
foodImg.src = './img/food.png';

document.addEventListener('keydown', direction);
let dir;
function direction(event) {
    if(event.keyCode === 37 && dir !== 'right') { 
        dir = 'left';
    } else if(event.keyCode === 38 && dir !== 'down') { 
        dir = 'up';
    } else if(event.keyCode === 39 && dir !== 'left') { 
        dir = 'right';
    } else if(event.keyCode === 40 && dir !== 'up') { 
        dir = 'down';
    }
}

function eatTail(head, array) {
    for(let i = 0; i < array.length; ++i) {
        if(head.x === array[i].x  && head.y === array[i].y) {
            clearInterval(game);
            setTimeout(endGame, 500);
        }
    }
}

let drawGame = () => {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    const cornerRadius = 20;
    ctx.lineJoin = "round";
    ctx.lineWidth = cornerRadius;

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'red';
        ctx.strokeStyle = 'green';
        ctx.lineJoin = "round";
        ctx.lineWidth = cornerRadius;
        ctx.strokeRect(snake[i].x + (cornerRadius/2), snake[i].y + (cornerRadius/2), blockSize - cornerRadius, blockSize-cornerRadius);
        ctx.fillRect(snake[i].x + (cornerRadius/2), snake[i].y + (cornerRadius/2), blockSize - cornerRadius, blockSize-cornerRadius)  // ctx.fillRect(x, y, width, height);
        
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px monospace';
    ctx.fillText(score, blockSize * 3, blockSize * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * blockSize,
            y: Math.floor(Math.random() * 15 + 3) * blockSize
        };
    } else {
        snake.pop(); //удаление последнего элемента
    }

    if (snakeX < blockSize || snakeX > blockSize * 17 
        || snakeY < 3 * blockSize || snakeY > blockSize * 17) {
            clearInterval(game);
            setTimeout(endGame, 500);
        }
    
    if(dir == 'left')   snakeX -= blockSize;
    if(dir == 'right')  snakeX += blockSize;
    if(dir == 'up')     snakeY -= blockSize;
    if(dir == 'down')   snakeY += blockSize;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
} 

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

function startGame() {
    let start = document.getElementById('start');

    canvas.style.display = 'block';
    start.style.display = 'none';
}

function endGame() {
    let end = document.getElementById('end');

    canvas.style.display = 'none';
    end.style.display = 'flex';
}

const endButton = document.getElementById('end-button');
endButton.addEventListener('click', () => {location.reload()});

const int = 100;
const game = setInterval(drawGame, int);