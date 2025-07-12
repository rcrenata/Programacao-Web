import { FPS, TAMX, TAMY, LIFE_COUNT } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { createRandomEnemy, moveEnemies, getAllEnemies, removeEnemy } from "./enemyShip.js"
import { Bullet } from "./bullet.js"

let isPlaying = false
let isPaused = false
let score = 0
let lives = LIFE_COUNT
let bullets = []

const scoreElement = document.getElementById("score")
const livesElement = document.getElementById("lives")
const gameOverDiv = document.getElementById("game-over")
const restartBtn = document.getElementById("restart-btn")

let gameStartTime = 0

function updateLivesHUD() {
  livesElement.innerHTML = ""
  for (let i = 0; i < lives; i++) {
    const img = document.createElement("img")
    img.src = "assets/png/life.png"
    img.alt = "Life"
    livesElement.appendChild(img)
  }
}

function updateScoreHUD() {
  const scoreStr = score.toString().padStart(6, "0")
  scoreElement.textContent = scoreStr
}

function showGameOver() {
  console.log(`Fim de jogo! Pontuação a ser salva: ${score}`);
  
  fetch('/game/score', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score: score }) 
  })
  .then(response => {
      if (response.ok) {
          console.log('Pontuação salva com sucesso!');
      } else {
          console.error('Falha ao salvar a pontuação.');
      }
  })
  .catch(error => {
      console.error('Erro de rede ao salvar pontuação:', error);
  });

  gameOverDiv.classList.remove("hidden");
}
function hideGameOver() {
  gameOverDiv.classList.add("hidden")
}

function resetGame() {
  score = 0
  lives = LIFE_COUNT
  updateScoreHUD()
  updateLivesHUD()
  bullets.forEach(b => b.remove())
  bullets = []
  getAllEnemies().forEach(e => removeEnemy(e))
  ship.element.style.left = `${TAMX / 2 - 50}px`
  ship.isDamaged = false
  ship.element.src = "assets/png/player.png"
  isPlaying = true
  isPaused = false
  hideGameOver()

  gameStartTime = performance.now()
}

function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  )
}

function pointsForEnemy(enemy) {
  switch (enemy.element.className) {
    case "enemy-ship": return 50
    case "enemy-ufo": return 20
    case "asteroid-big": return 10
    case "asteroid-small": return 100
    default: return 0
  }
}

function run() {
  if (!isPlaying || isPaused) return

  space.move()
  ship.move()

  createRandomEnemy()

  const elapsedMinutes = (performance.now() - gameStartTime) / 60000
  const speedMultiplier = 1 + elapsedMinutes * 0.1

  moveEnemies(speedMultiplier)

  bullets.forEach((bullet, i) => {
    bullet.move()
    if (bullet.isOutOfScreen()) {
      bullet.remove()
      bullets.splice(i, 1)
    }
  })

  bullets.forEach((bullet, bi) => {
    const bRect = bullet.getRect()
    getAllEnemies().forEach(enemy => {
      if (!enemy.element) return
      const eRect = enemy.getRect()
      if (isColliding(bRect, eRect)) {
        score += pointsForEnemy(enemy)
        updateScoreHUD()
        bullet.remove()
        bullets.splice(bi, 1)
        removeEnemy(enemy)
      }
    })
  })

  const shipRect = ship.getRect()
  getAllEnemies().forEach(enemy => {
    if (!enemy.element) return
    const eRect = enemy.getRect()
    if (isColliding(shipRect, eRect)) {
      lives--
      updateLivesHUD()
      ship.damage()
      removeEnemy(enemy)
      if (lives <= 0) {
        isPlaying = false
        showGameOver()
      }
    }
  })
}

function init() {
  updateScoreHUD()
  updateLivesHUD()

  setInterval(run, 1000 / FPS)

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") ship.changeDirection(-1)
    if (e.key === "ArrowRight") ship.changeDirection(1)

    if (e.key === " ") {
      if (!isPlaying) {
        resetGame()
      } else if (!isPaused) {
        const shipRect = ship.element.getBoundingClientRect()
        const spaceRect = space.element.getBoundingClientRect()

        const bulletX = shipRect.left - spaceRect.left + shipRect.width / 2 - 4
        const bulletY = shipRect.top - spaceRect.top - 20

        bullets.push(new Bullet(bulletX, bulletY))
      }
      e.preventDefault()
    }

    if (e.key.toLowerCase() === "p" && isPlaying) {
      isPaused = !isPaused
    }
  })

  restartBtn.addEventListener("click", () => {
    resetGame()
  })
}

init()
