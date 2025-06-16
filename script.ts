const canvas = document.querySelector('canvas') as HTMLCanvasElement
const canvasContainer = document.querySelector('div') as HTMLDivElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
const Elpacman = document.querySelector('#pacman') as HTMLImageElement

// 2 indicates that theres a coin for pacman
// 0 indicates empty filed
// 1 indicates a wall
const gameboard = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 'P', 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

canvas.width = canvasContainer.clientWidth
canvas.height = canvasContainer.clientHeight

const config = {
  pacmanSpeed: 1000, // ms to move one bloxk
  ghostSpeed: 10,
  widthPice: canvas.width / gameboard[0].length,
  heightPice: canvas.height / gameboard.length,
  pacmanDirection: 'right'
}

class Pacman {
  x: number
  y: number
  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  moveRight (): void {
    Elpacman.style.rotate = '0deg'
    const nextPositionX = gameboard[this.y][this.x + 1]
    if (nextPositionX === 1) {
      return
    }
    gameboard[this.y][this.x + 1] = 'P'
    gameboard[this.y][this.x] = 0
    this.x += 1
  }

  moveLeft (): void {
    Elpacman.style.rotate = '180deg'
    const nextPositionX = gameboard[this.y][this.x - 1]
    if (nextPositionX === 1) {
      return
    }
    gameboard[this.y][this.x - 1] = 'P'
    gameboard[this.y][this.x] = 0
    this.x -= 1
  }
}

const pacman = new Pacman(10, 13)

window.addEventListener('resize', () => {
  canvas.width = canvasContainer.clientWidth
  canvas.height = canvasContainer.clientHeight
  config.widthPice = canvas.width / gameboard[0].length
  config.heightPice = canvas.height / gameboard.length
  renderGameboard(gameboard)
})

function renderGameboard (gameboard: Array<Array<number | string>>): void {
  const widthPiece = config.widthPice
  const heightPiece = config.heightPice
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  gameboard.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === 2) {
        // lest draw a circle
        ctx.beginPath()
        const x = (cellIndex * widthPiece) + (widthPiece / 2)
        const y = (rowIndex * heightPiece) + (heightPiece / 2)
        ctx.arc(x, y, widthPiece / 5, 0, 2 * Math.PI)
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.closePath()
      } else if (cell === 'P') {
        Elpacman.style.left = `${(cellIndex * widthPiece) + 5}px`
        Elpacman.style.top = `${(rowIndex * heightPiece)}px`
      }
    })
  })
}

renderGameboard(gameboard)

setInterval(() => {
  if (config.pacmanDirection === 'right') {
    pacman.moveRight()
    renderGameboard(gameboard)
  }
}, config.pacmanSpeed)
