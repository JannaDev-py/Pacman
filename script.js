import { followThetarget } from './routeAlgorithm.js';
const canvas = document.querySelector('canvas');
const canvasContainer = document.querySelector('div');
const ctx = canvas.getContext('2d');
const Elpacman = document.querySelector('#pacman');
const Elblinky = document.querySelector('#blinky');
const Elpinky = document.querySelector('#pinky');
const Elinky = document.querySelector('#inky');
const Elclyde = document.querySelector('#clyde');
// 2 indicates that theres a coin for pacman
// 0 indicates empty filed
// 1 indicates a wall
// b indicates blinky
// p indicates pinky
// i indicates inky
// c indicates clyde
// P indicates pacman
// const gameboard = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//   [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
//   [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
//   [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//   [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
//   [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
//   [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 3, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
//   [2, 2, 2, 2, 2, 2, 2, 2, 1, 'b', 0, 'p', 1, 2, 2, 2, 2, 2, 2, 2, 2], // x = 0 y = 10, x = 21 y = 10
//   [1, 1, 1, 1, 1, 2, 1, 2, 1, 'i', 0, 'c', 1, 2, 1, 2, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 1],
//   [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 'P', 2, 2, 2, 1, 2, 1, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
//   [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//   [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
//   [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
//   [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
//   [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
//   [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
//   [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]
const gameboard = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1], //
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1], //
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1], //
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], //
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1], //
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1], //
    [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 3, 3, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 'p', 0, 0, 0, 0, 'b', 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 'i', 0, 0, 0, 0, 'c', 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 'P', 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], //
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1], //
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1], //
    [1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1], //
    [1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1], //
    [1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1], //
    [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1], //
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1], //
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1], //
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const startPositions = {
    pacman: { x: 14, y: 17 },
    pinky: { x: 11, y: 13 },
    clyde: { x: 16, y: 15 },
    blinky: { x: 16, y: 13 },
    inky: { x: 11, y: 15 }
};
canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;
const config = {
    pacmanSpeed: 150, // ms to move one block
    ghostSpeed: 250,
    pacmanLives: 3,
    ghostDirections: {
        blinky: '',
        pinky: '',
        inky: '',
        clyde: ''
    },
    widthPice: canvas.width / gameboard[0].length,
    heightPice: canvas.height / gameboard.length,
    pacmanDirection: 'right',
    pacmanNextDirection: 'right'
};
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
        if (this.x === gameboard[0].length - 1 && this.y === 14) {
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
        if (this.x === 0 && this.y === 14) {
            gameboard[this.y][this.x] = 0;
            gameboard[this.y][gameboard[0].length - 1] = 'P';
            this.x = gameboard[0].length - 1;
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
class Ghost {
    constructor(x, y, el, letter) {
        this.el = el;
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.previousState = 0;
    }
    moveRight() {
        this.el.style.rotate = '0deg';
        const nextPosition = gameboard[this.y][this.x + 1];
        if (nextPosition === 1 || nextPosition === 3) {
            return;
        }
        else if (nextPosition === 'P') {
            config.pacmanLives -= 1;
        }
        gameboard[this.y][this.x + 1] = this.letter;
        gameboard[this.y][this.x] = this.previousState;
        this.previousState = nextPosition;
        this.x += 1;
        if (this.x === gameboard[0].length - 1 && this.y === 14) {
            gameboard[this.y][this.x] = 0;
            gameboard[this.y][0] = 'P';
            this.x = 0;
        }
    }
    moveLeft() {
        this.el.style.rotate = '180deg';
        const nextPosition = gameboard[this.y][this.x - 1];
        if (nextPosition === 1 || nextPosition === 3) {
            return;
        }
        else if (nextPosition === 'P') {
            config.pacmanLives -= 1;
        }
        gameboard[this.y][this.x - 1] = this.letter;
        gameboard[this.y][this.x] = this.previousState;
        this.previousState = nextPosition;
        this.x -= 1;
        if (this.x === 0 && this.y === 14) {
            gameboard[this.y][this.x] = 0;
            gameboard[this.y][gameboard[0].length - 1] = 'P';
            this.x = gameboard[0].length - 1;
        }
    }
    moveUp() {
        this.el.style.rotate = '270deg';
        const nextPosition = gameboard[this.y - 1][this.x];
        if (nextPosition === 1) {
            return;
        }
        else if (nextPosition === 'P') {
            config.pacmanLives -= 1;
        }
        gameboard[this.y - 1][this.x] = this.letter;
        gameboard[this.y][this.x] = this.previousState;
        this.previousState = nextPosition;
        this.y -= 1;
    }
    moveDown() {
        this.el.style.rotate = '90deg';
        const nextPosition = gameboard[this.y + 1][this.x];
        if (nextPosition === 1 || nextPosition === 3) {
            return;
        }
        else if (nextPosition === 'P') {
            config.pacmanLives -= 1;
        }
        gameboard[this.y + 1][this.x] = this.letter;
        gameboard[this.y][this.x] = this.previousState;
        this.previousState = nextPosition;
        this.y += 1;
    }
    move(move) {
        if (move === 'right') {
            this.moveRight();
        }
        else if (move === 'left') {
            this.moveLeft();
        }
        else if (move === 'up') {
            this.moveUp();
        }
        else if (move === 'down') {
            this.moveDown();
        }
    }
}
const pacman = new Pacman(startPositions.pacman.x, startPositions.pacman.y); // 10, 13 initial position
const ghosts = [
    new Ghost(startPositions.blinky.x, startPositions.blinky.y, Elblinky, 'b'),
    new Ghost(startPositions.pinky.x, startPositions.pinky.y, Elpinky, 'p'),
    new Ghost(startPositions.inky.x, startPositions.inky.y, Elinky, 'i'),
    new Ghost(startPositions.clyde.x, startPositions.clyde.y, Elclyde, 'c')
];
ghosts[0].moveRight();
renderGameboard(gameboard);
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
    requestAnimationFrame(() => { renderGameboard(gameboard); });
    gameboard.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            const left = cellIndex * widthPiece + 5;
            const top = rowIndex * heightPiece;
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
                Elpacman.style.left = `${left - 3}px`;
                Elpacman.style.top = `${top}px`;
            }
            else if (cell === 'b') {
                Elblinky.style.left = `${left}px`;
                Elblinky.style.top = `${top}px`;
            }
            else if (cell === 'p') {
                Elpinky.style.left = `${left}px`;
                Elpinky.style.top = `${top}px`;
            }
            else if (cell === 'i') {
                Elinky.style.left = `${left}px`;
                Elinky.style.top = `${top}px`;
            }
            else if (cell === 'c') {
                Elclyde.style.left = `${left}px`;
                Elclyde.style.top = `${top}px`;
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
    checkForNextDirection();
}, config.pacmanSpeed);
setInterval(() => {
    const blinky = ghosts[0];
    const blinkyDirection = followThetarget(gameboard, { x: pacman.x, y: pacman.y }, { x: blinky.x, y: blinky.y }, config.ghostDirections.blinky);
    config.ghostDirections.blinky = blinkyDirection;
    blinky.move(blinkyDirection);
}, config.ghostSpeed);
renderGameboard(gameboard);
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
