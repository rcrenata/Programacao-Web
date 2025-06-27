import { TAMX, PROB_ENEMY_SHIP, PROB_ENEMY_UFO, PROB_ASTEROID_BIG, PROB_ASTEROID_SMALL, SPEED_MIN, SPEED_MAX } from "./config.js"
import { space } from "./space.js"

class EnemyBase {
  constructor(imgSrc, className) {
    this.element = document.createElement("img")
    this.element.className = className
    this.element.src = imgSrc
    this.speed = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN)
    this.element.style.top = "-50px"
    this.element.style.left = `${Math.floor(Math.random() * (TAMX - 50))}px`
    space.element.appendChild(this.element)
  }

  move(speedMultiplier = 1) {
    const top = parseFloat(this.element.style.top) || 0
    this.element.style.top = `${top + this.speed * speedMultiplier}px`
  }

  getTop() {
    return parseFloat(this.element.style.top) || 0
  }

  remove() {
    if (this.element.parentNode) this.element.parentNode.removeChild(this.element)
  }

  getRect() {
    return this.element.getBoundingClientRect()
  }
}

export class EnemyShip extends EnemyBase {
  constructor() {
    super("assets/png/enemyShip.png", "enemy-ship")
  }
}

export class EnemyUFO extends EnemyBase {
  constructor() {
    super("assets/png/enemyUFO.png", "enemy-ufo")
  }
}

export class AsteroidBig extends EnemyBase {
  constructor() {
    super("assets/png/meteorBig.png", "asteroid-big")
  }
}

export class AsteroidSmall extends EnemyBase {
  constructor() {
    super("assets/png/meteorSmall.png", "asteroid-small")
  }
}

const enemyShips = []
const enemyUFOs = []
const asteroidsBig = []
const asteroidsSmall = []

export const createRandomEnemy = () => {
  if (Math.random() < PROB_ENEMY_SHIP) enemyShips.push(new EnemyShip())
  if (Math.random() < PROB_ENEMY_UFO) enemyUFOs.push(new EnemyUFO())
  if (Math.random() < PROB_ASTEROID_BIG) asteroidsBig.push(new AsteroidBig())
  if (Math.random() < PROB_ASTEROID_SMALL) asteroidsSmall.push(new AsteroidSmall())
}

export const moveEnemies = (speedMultiplier) => {
  enemyShips.forEach((e, i) => {
    e.move(speedMultiplier)
    if (e.getTop() > 900) {
      e.remove()
      enemyShips.splice(i, 1)
    }
  })
  enemyUFOs.forEach((e, i) => {
    e.move(speedMultiplier)
    if (e.getTop() > 900) {
      e.remove()
      enemyUFOs.splice(i, 1)
    }
  })
  asteroidsBig.forEach((e, i) => {
    e.move(speedMultiplier)
    if (e.getTop() > 900) {
      e.remove()
      asteroidsBig.splice(i, 1)
    }
  })
  asteroidsSmall.forEach((e, i) => {
    e.move(speedMultiplier)
    if (e.getTop() > 900) {
      e.remove()
      asteroidsSmall.splice(i, 1)
    }
  })
}

export const getAllEnemies = () => {
  return [...enemyShips, ...enemyUFOs, ...asteroidsBig, ...asteroidsSmall]
}

export const removeEnemy = (enemy) => {
  enemy.remove()
  const removeFromArray = (arr) => {
    const index = arr.indexOf(enemy)
    if (index !== -1) arr.splice(index, 1)
  }
  removeFromArray(enemyShips)
  removeFromArray(enemyUFOs)
  removeFromArray(asteroidsBig)
  removeFromArray(asteroidsSmall)
}
