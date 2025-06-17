import { followTheGoal } from './routeAlgorithm.js';
const canvas = document.querySelector('canvas');
const canvasContainer = document.querySelector('div');
const ctx = canvas.getContext('2d');
const Elpacman = document.querySelector('#pacman');
// 2 indicates that theres a coin for pacman
// 0 indicates empty filed
// 1 indicates a wall
export const gameboard = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 3, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2], // x = 0 y = 10, x = 21 y = 10
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 'P', 2, 2, 2, 1, 2, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;
const config = {
    pacmanSpeed: 150, // ms to move one block
    widthPice: canvas.width / gameboard[0].length,
    heightPice: canvas.height / gameboard.length,
    pacmanDirection: 'right',
    pacmanNextDirection: 'right'
};
// const ghostConfig = {
//   ghostSpeed: 10,
//   ghostDirection: 'right'
// }
// console.log(ghostConfig)
class Pacman {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    moveRight() {
        Elpacman.style.rotate = '0deg';
        const nextPositionX = gameboard[this.y][this.x + 1];
        if (nextPositionX === 1 || nextPositionX === 3) {
            return;
        }
        gameboard[this.y][this.x + 1] = 'P';
        gameboard[this.y][this.x] = 0;
        this.x += 1;
        if (this.x === 20 && this.y === 10) {
            gameboard[this.y][this.x] = 0;
            gameboard[this.y][0] = 'P';
            this.x = 0;
        }
    }
    moveLeft() {
        Elpacman.style.rotate = '180deg';
        const nextPosition = gameboard[this.y][this.x - 1];
        if (nextPosition === 1 || nextPosition === 3) {
            return;
        }
        gameboard[this.y][this.x - 1] = 'P';
        gameboard[this.y][this.x] = 0;
        this.x -= 1;
        if (this.x === 0 && this.y === 10) {
            gameboard[this.y][this.x] = 0;
            gameboard[this.y][20] = 'P';
            this.x = 20;
        }
    }
    moveUp() {
        Elpacman.style.rotate = '270deg';
        const nextPosition = gameboard[this.y - 1][this.x];
        if (nextPosition === 1 || nextPosition === 3) {
            return;
        }
        gameboard[this.y - 1][this.x] = 'P';
        gameboard[this.y][this.x] = 0;
        this.y -= 1;
    }
    moveDown() {
        Elpacman.style.rotate = '90deg';
        const nextPosition = gameboard[this.y + 1][this.x];
        if (nextPosition === 1 || nextPosition === 3) {
            return;
        }
        gameboard[this.y + 1][this.x] = 'P';
        gameboard[this.y][this.x] = 0;
        this.y += 1;
    }
}
const pacman = new Pacman(10, 13); // 10, 13 initial position
function checkForNextDirection() {
    if (config.pacmanNextDirection === 'right') {
        if (gameboard[pacman.y][pacman.x + 1] !== 1 && gameboard[pacman.y][pacman.x + 1] !== 3) {
            config.pacmanDirection = 'right';
        }
    }
    else if (config.pacmanNextDirection === 'left') {
        if (gameboard[pacman.y][pacman.x - 1] !== 1 && gameboard[pacman.y][pacman.x - 1] !== 3) {
            config.pacmanDirection = 'left';
        }
    }
    else if (config.pacmanNextDirection === 'up') {
        if (gameboard[pacman.y - 1][pacman.x] !== 1 && gameboard[pacman.y - 1][pacman.x] !== 3) {
            config.pacmanDirection = 'up';
        }
    }
    else if (config.pacmanNextDirection === 'down') {
        if (gameboard[pacman.y + 1][pacman.x] !== 1 && gameboard[pacman.y + 1][pacman.x] !== 3) {
            config.pacmanDirection = 'down';
        }
    }
}
window.addEventListener('resize', () => {
    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;
    config.widthPice = canvas.width / gameboard[0].length;
    config.heightPice = canvas.height / gameboard.length;
    renderGameboard(gameboard);
});
function renderGameboard(gameboard) {
    const widthPiece = config.widthPice;
    const heightPiece = config.heightPice;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameboard.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cell === 2) {
                // lest draw a circle
                ctx.beginPath();
                const x = (cellIndex * widthPiece) + (widthPiece / 2);
                const y = (rowIndex * heightPiece) + (heightPiece / 2);
                ctx.arc(x, y, widthPiece / 5, 0, 2 * Math.PI);
                ctx.fillStyle = 'yellow';
                ctx.fill();
                ctx.closePath();
            }
            else if (cell === 'P') {
                Elpacman.style.left = `${(cellIndex * widthPiece) + 5}px`;
                Elpacman.style.top = `${(rowIndex * heightPiece)}px`;
            }
        });
    });
}
setInterval(() => {
    if (config.pacmanDirection === 'right')
        pacman.moveRight();
    if (config.pacmanDirection === 'left')
        pacman.moveLeft();
    if (config.pacmanDirection === 'up')
        pacman.moveUp();
    if (config.pacmanDirection === 'down')
        pacman.moveDown();
    renderGameboard(gameboard);
    checkForNextDirection();
}, config.pacmanSpeed);
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowRight')
        config.pacmanNextDirection = 'right';
    else if (key === 'ArrowLeft')
        config.pacmanNextDirection = 'left';
    else if (key === 'ArrowUp')
        config.pacmanNextDirection = 'up';
    else if (key === 'ArrowDown')
        config.pacmanNextDirection = 'down';
});
console.log(followTheGoal(gameboard, { x: 13, y: 13 }, 'left'));
