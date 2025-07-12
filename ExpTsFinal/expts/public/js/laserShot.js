import { space } from "./space.js"

export class LaserShot {
  constructor(x, y) {
    this.element = document.createElement("img")
    this.element.src = "assets/png/laserGreenShot.png" 
    this.element.style.position = "absolute"
    this.element.style.left = `${x}px`
    this.element.style.top = `${y}px`
    this.element.style.pointerEvents = "none"
    this.element.style.zIndex = "5000"
    this.element.style.width = "50px" 
    this.element.style.height = "50px"

    space.element.appendChild(this.element)

    this.timeoutId = setTimeout(() => {
      this.remove()
    }, 200)
  }

  remove() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }
}
