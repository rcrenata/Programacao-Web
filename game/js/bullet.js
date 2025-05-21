import { space } from "./space.js"

export class Bullet {
  constructor(x, y) {
    this.element = document.createElement("img")
    this.element.className = "bullet"
    this.element.src = "assets/png/laserGreenShot.png"
    this.element.style.left = `${x}px`
    this.element.style.top = `${y}px`
    space.element.appendChild(this.element)
    this.speed = 8
  }

  move() {
    const top = parseFloat(this.element.style.top) || 0
    this.element.style.top = `${top - this.speed}px`
  }

  isOutOfScreen() {
    return (parseFloat(this.element.style.top) || 0) < -20
  }

  remove() {
    if (this.element.parentNode) this.element.parentNode.removeChild(this.element)
  }

  getRect() {
    return this.element.getBoundingClientRect()
  }
}
