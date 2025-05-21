import { TAMX } from "./config.js"
import { space } from "./space.js"

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
]

const damagedImg = "assets/png/playerDamaged.png"

class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.element.src = directions[this.direction]
    this.element.style.bottom = "20px"
    this.element.style.left = `${TAMX / 2 - 50}px`
    space.element.appendChild(this.element)
    this.isDamaged = false
    this.width = 100
    this.damageTimeoutId = null
  }

  changeDirection(giro) {
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction += giro
    if (!this.isDamaged) {
      this.element.src = directions[this.direction]
    }
  }

  move() {
    let left = parseInt(this.element.style.left, 10)
    if (this.direction === 0) left -= 5
    if (this.direction === 2) left += 5

    if (left < 0) left = 0
    if (left > TAMX - this.width) left = TAMX - this.width
    this.element.style.left = `${left}px`
  }

  damage() {
    this.isDamaged = true
    this.element.src = damagedImg

    if (this.damageTimeoutId) clearTimeout(this.damageTimeoutId)

    this.damageTimeoutId = setTimeout(() => {
      this.isDamaged = false
      this.element.src = directions[this.direction]
      this.damageTimeoutId = null
    }, 5000)
  }

  getRect() {
    return this.element.getBoundingClientRect()
  }
}

export const ship = new Ship()
