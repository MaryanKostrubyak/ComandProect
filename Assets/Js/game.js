document.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('.player');
  const container = document.querySelector('.game-container');
  const scoreDisplay = document.createElement('div');
  scoreDisplay.classList.add('score');
  const lifeDisplay = document.createElement('div');
  lifeDisplay.classList.add('life');
  const bestScoreDisplay = document.getElementById('bestScoreDisplay');

  let playerX = 0;
  let playerSpeed = 10; 
  let objectFallSpeed = 2; 
  let score = 0;
  let life = 3;
  let gameInterval;
  let fallInterval;
  let keydownListener;
  let gameActive = false;
  let paused = false; 
  const startMenu = document.getElementById('startMenu');
  const endMenu = document.getElementById('endMenu');
  const gameOverText = document.getElementById('gameOverText');
  const scoreText = document.getElementById('scoreText');
  
  let bestScore = localStorage.getItem('bestScore') || 0;
  bestScoreDisplay.textContent = 'Ваш найліпший результат в нашій грі: ' + bestScore;

  function createObject(className, imageUrl) {
    const object = document.createElement('img'); 
    object.className = className;
    object.src = imageUrl; 
    object.style.left = Math.random() * (container.offsetWidth - 50) + 'px';
    object.style.top = Math.random() * 50 + 'px';
    container.appendChild(object);
  }

  function updateObjects() {
    if (!paused) { 
      const objects = document.querySelectorAll('.food, .kitchen-tool');
      
      objects.forEach(object => {
        let top = object.offsetTop + objectFallSpeed; 
        object.style.top = top + 'px';
  
        if (collision(player, object)) {
          if (object.classList.contains('food')) {
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
            object.remove();
          } else if (object.classList.contains('kitchen-tool')) {
            life--;
            updateLifeDisplay(); 
            object.remove();
          }
        }
  
        if (top > container.offsetHeight) {
          if (object.classList.contains('food')) {
            life--; 
            updateLifeDisplay(); 
          }
          object.remove();
        }
      });
  
      if (life <= 0) {
        endGame(); 
      }
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (paused) {
        resumeGame();
      } else {
        pauseGame();
      }
    }
  });

  function pauseGame() {
    clearInterval(gameInterval);
    clearInterval(fallInterval);
    paused = true;
    document.getElementById('pauseMenu').style.display = 'block'; 
  }

  function resumeGame() {
    startObjectFall();
    gameInterval = setInterval(updateObjects, 20);
    paused = false;
    document.getElementById('pauseMenu').style.display = 'none'; 
  }

  function collision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom);
  }

  function updateLifeDisplay() {
    lifeDisplay.innerHTML = '';
    for (let i = 0; i < life; i++) {
      const heartImg = document.createElement('img');
      heartImg.src = 'Assets/Images/heart.png'; 
      lifeDisplay.appendChild(heartImg); 
    }
  }

  function movePlayer() {
    if (keydownListener) {
      document.removeEventListener('keydown', keydownListener);
    }
  
    keydownListener = (event) => {
      if (!paused) { 
        if (event.key === 'ArrowLeft') {
          playerX = Math.max(0, playerX - playerSpeed);
        } else if (event.key === 'ArrowRight') {
          playerX = Math.min(container.offsetWidth - player.offsetWidth, playerX + playerSpeed);
        }
        player.style.left = playerX + 'px';
      }
    };
  
    document.addEventListener('keydown', keydownListener);
  }

  function startObjectFall() {
    clearInterval(fallInterval);
    fallInterval = setInterval(() => { 
      if (gameActive) { 
        const random = Math.random();
        if (random < 0.5) {
          createObject('food', 'Assets/Images/suhi.png');
        } else {
          createObject('kitchen-tool', 'Assets/Images/noj.png');
        }
      }
    }, 1500); 
  }

  function increaseDifficulty() {
    playerSpeed += 0.3; 
    objectFallSpeed += 0.07; 
  }

  function startGame() {
    startMenu.style.display = 'none';
    endMenu.style.display = 'none';
    startButton.style.display = 'none';
    resetGame();
    startObjectFall();
    gameInterval = setInterval(updateObjects, 20);
    movePlayer();
    gameActive = true;
    updateLifeDisplay();
    setInterval(increaseDifficulty, 5000); 
  }

  function endGame() {
    clearInterval(gameInterval); 
    clearInterval(fallInterval); 
    gameActive = false;
    gameOverText.textContent = 'Ви програли!';
    scoreText.textContent = 'Ваш результат: ' + score;

    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem('bestScore', bestScore);
      bestScoreDisplay.textContent = 'Ваш найліпший результат в нашій грі: ' + bestScore;
    }

    endMenu.style.display = 'block';
    startMenu.style.display = 'none';
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
      resetGame();
      startGame();
    });
    const objects = document.querySelectorAll('.food, .kitchen-tool');
    objects.forEach(object => object.remove());
  }

  function resetGame() {
    clearInterval(gameInterval);
    clearInterval(fallInterval); 
    score = 0;
    life = 3;
    scoreDisplay.textContent = 'Score: ' + score;
    updateLifeDisplay();

    playerX = 0;
    playerSpeed = 10; 
    objectFallSpeed = 2; 
    endMenu.style.display = 'none';
    startMenu.style.display = 'block';
    const objects = document.querySelectorAll('.food, .kitchen-tool');
    objects.forEach(object => object.remove());
    gameActive = false;
    document.removeEventListener('keydown', keydownListener);
  }

  document.getElementById('startButton').addEventListener('click', () => {
    resetGame();
    startGame();
  });

  container.appendChild(scoreDisplay);
  container.appendChild(lifeDisplay);
});