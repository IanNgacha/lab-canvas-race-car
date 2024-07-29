let obstacles = [];
let score = 0; 
const obstacleWidth = 50;
const obstacleHeight = 100;
const obstacleSpeed = 5;
const obstacleInterval = 2000; 

class Obstacle {
  constructor() {
    this.x = Math.random() * (canvas.width - obstacleWidth);
    this.y = 0;
  }

  update() {
    this.y += obstacleSpeed;
  }

  draw() {
    ctx.fillStyle = 'red'; 
    ctx.fillRect(this.x, this.y, obstacleWidth, obstacleHeight);
  }
}

function startGame() {
 
  document.querySelector('.game-intro').style.display = 'none';
  document.querySelector('#game-board').style.display = 'block';

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const roadImg = new Image();
  roadImg.src = './images/road.png';

  const carImg = new Image();
  carImg.src = './images/car.png';

  const carWidth = 50;
  const carHeight = 100;
  let carX = (canvas.width - carWidth) / 2;
  const carY = canvas.height - carHeight - 20; 
  roadImg.onload = () => {
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
    drawCar();
  };

  carImg.onload = () => {
    drawCar();
  };

  function drawCar() {
    ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
  }

  function moveCar(direction) {
    const moveAmount = 10; 

    if (direction === 'left') {
      carX = Math.max(0, carX - moveAmount);
    } else if (direction === 'right') {
      carX = Math.min(canvas.width - carWidth, carX + moveAmount);
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
    drawCar();
    drawObstacles();
    drawScore();
  }

  function createObstacle() {
    obstacles.push(new Obstacle());
  }

  function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      obstacle.update();

      if (obstacle.y > canvas.height) {
        obstacles.splice(i, 1);
        i--;
        score++;
      }
    }
  }

  function drawObstacles() {
    for (const obstacle of obstacles) {
      obstacle.draw();
    }
  }

  function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30); 
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
    drawCar();
    updateObstacles();
    drawObstacles();
    drawScore();
    requestAnimationFrame(gameLoop);
  }

  setInterval(createObstacle, obstacleInterval);
  setInterval(() => {
    score++; 
  }, scoreInterval);

  gameLoop();

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      moveCar('left');
    } else if (event.key === 'ArrowRight') {
      moveCar('right');
    }
  });
}

window.addEventListener('load', () => {
  let startBtn = document.querySelector('#start-button');

  startBtn.addEventListener('click', () => {
    startGame();
  });
});
