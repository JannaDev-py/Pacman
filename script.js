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
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0, 0, 0, 'b', 0, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 'i', 0, 'p', 0, 'c', 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1], //
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
    blinky: { x: 14, y: 13 },
    pinky: { x: 13, y: 14 },
    inky: { x: 11, y: 14 },
    clyde: { x: 15, y: 14 }
};
canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;
const config = {
    pacmanSpeed: 150, // ms to move one block
    pacmanPointsLeft: 298,
    ghostSpeed: {
        blinky: 200,
        pinky: 200,
        inky: 200,
        clyde: 200
    },
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
    cleanGameboard() {
        gameboard.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === 'P') {
                    gameboard[rowIndex][cellIndex] = 0;
                }
            });
        });
        config.pacmanLives = 3;
    }
    moveRight() {
        Elpacman.style.rotate = '0deg';
        const nextPositionX = gameboard[this.y][this.x + 1];
        if (nextPositionX === 1 || nextPositionX === 3) {
            return;
        }
        else if (nextPositionX === 2) {
            config.pacmanPointsLeft -= 1;
        }
        this.cleanGameboard();
        gameboard[this.y][this.x + 1] = 'P';
        gameboard[this.y][this.x] = 0;
        this.x += 1;
        if (this.x === gameboard[0].length - 1 && this.y === 14) {
            gameboard[this.y][this.x] = 0;
            this.cleanGameboard();
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
        else if (nextPosition === 2) {
            config.pacmanPointsLeft -= 1;
        }
        this.cleanGameboard();
        gameboard[this.y][this.x - 1] = 'P';
        gameboard[this.y][this.x] = 0;
        this.x -= 1;
        if (this.x === 0 && this.y === 14) {
            gameboard[this.y][this.x] = 0;
            this.cleanGameboard();
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
        else if (nextPosition === 2) {
            config.pacmanPointsLeft -= 1;
        }
        this.cleanGameboard();
        gameboard[this.y - 1][this.x] = 'P';
        gameboard[this.y][this.x] = 0;
        this.y -= 1;
    }
    moveDown() {
        Elpacman.style.rotate = '90deg';
        const nextPosition = gameboard[this.y + 1][this.x];
        if (nextPosition === 1 ||
            nextPosition === 3 ||
            nextPosition === 'P' ||
            nextPosition === 'b' ||
            nextPosition === 'i' ||
            nextPosition === 'c') {
            return;
        }
        else if (nextPosition === 2) {
            config.pacmanPointsLeft -= 1;
        }
        this.cleanGameboard();
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
    cleanGameboard() {
        gameboard.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === this.letter) {
                    gameboard[rowIndex][cellIndex] = 0;
                }
            });
        });
    }
    moveRight() {
        this.el.style.rotate = '0deg';
        const nextPosition = gameboard[this.y][this.x + 1];
        if (nextPosition === 1 || nextPosition === 3) {
            return;
        }
        else if (nextPosition === 'P') {
            config.pacmanLives -= 1;
            if (config.pacmanLives === 0)
                resetGame();
        }
        this.cleanGameboard();
        gameboard[this.y][this.x + 1] = this.letter;
        gameboard[this.y][this.x] = this.previousState;
        this.previousState = nextPosition;
        this.x += 1;
        if (this.x === gameboard[0].length - 1 && this.y === 14) {
            gameboard[this.y][this.x] = this.previousState;
            this.previousState = gameboard[this.y][0];
            this.cleanGameboard();
            gameboard[this.y][0] = this.letter;
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
            if (config.pacmanLives === 0)
                resetGame();
        }
        this.cleanGameboard();
        gameboard[this.y][this.x - 1] = this.letter;
        gameboard[this.y][this.x] = this.previousState;
        this.previousState = nextPosition;
        this.x -= 1;
        if (this.x === 0 && this.y === 14) {
            gameboard[this.y][this.x] = this.previousState;
            this.previousState = gameboard[this.y][gameboard[0].length - 1];
            this.cleanGameboard();
            gameboard[this.y][gameboard[0].length - 1] = this.letter;
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
            if (config.pacmanLives === 0)
                resetGame();
        }
        this.cleanGameboard();
        gameboard[this.y - 1][this.x] = this.letter;
        gameboard[this.y][this.x] = this.previousState;
        this.previousState = nextPosition;
        this.y -= 1;
    }
    moveDown() {
        this.el.style.rotate = '90deg';
        const nextPosition = gameboard[this.y + 1][this.x];
        if (nextPosition === 1 ||
            nextPosition === 3 ||
            nextPosition === 'p' ||
            nextPosition === 'b' ||
            nextPosition === 'i' ||
            nextPosition === 'c') {
            return;
        }
        else if (nextPosition === 'P') {
            config.pacmanLives -= 1;
            if (config.pacmanLives === 0)
                resetGame();
        }
        this.cleanGameboard();
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
function checkForNextDirection() {
    if (config.pacmanNextDirection === 'right') {
        if (gameboard[pacman.y][pacman.x + 1] !== 1 &&
            gameboard[pacman.y][pacman.x + 1] !== 3 &&
            pacman.x + 1 < gameboard[0].length) {
            config.pacmanDirection = 'right';
        }
    }
    else if (config.pacmanNextDirection === 'left') {
        if (gameboard[pacman.y][pacman.x - 1] !== 1 &&
            gameboard[pacman.y][pacman.x - 1] !== 3 &&
            pacman.x - 1 >= 0) {
            config.pacmanDirection = 'left';
        }
    }
    else if (config.pacmanNextDirection === 'up') {
        if (gameboard[pacman.y - 1][pacman.x] !== 1 && gameboard[pacman.y - 1][pacman.x] !== 3) {
            config.pacmanDirection = 'up';
        }
    }
    else if (config.pacmanNextDirection === 'down') {
        if (gameboard[pacman.y + 1][pacman.x] !== 1 &&
            gameboard[pacman.y + 1][pacman.x] !== 3 &&
            gameboard[pacman.y + 1][pacman.x] !== 'P' &&
            gameboard[pacman.y + 1][pacman.x] !== 'b' &&
            gameboard[pacman.y + 1][pacman.x] !== 'i' &&
            gameboard[pacman.y + 1][pacman.x] !== 'c') {
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
            else if (cell === 'O') {
                ctx.beginPath();
                const x = (cellIndex * widthPiece) + (widthPiece / 2);
                const y = (rowIndex * heightPiece) + (heightPiece / 2);
                ctx.arc(x, y, widthPiece / 5, 0, 2 * Math.PI);
                ctx.fillStyle = '#3f7';
                ctx.fill();
                ctx.closePath();
            }
        });
    });
}
function startGame() {
    setInterval(() => {
        if (config.pacmanDirection === 'right')
            pacman.moveRight();
        else if (config.pacmanDirection === 'left')
            pacman.moveLeft();
        else if (config.pacmanDirection === 'up')
            pacman.moveUp();
        else if (config.pacmanDirection === 'down')
            pacman.moveDown();
        if (config.pacmanPointsLeft === 0)
            resetGame();
        checkForNextDirection();
    }, config.pacmanSpeed);
    // rutine for blinky
    setTimeout(() => {
        const blinky = ghosts[0];
        setTimeout(() => { blinky.moveUp(); }, config.ghostSpeed.blinky);
        setTimeout(() => { blinky.moveUp(); }, config.ghostSpeed.blinky);
        setInterval(() => {
            const blinkyDirection = followThetarget(gameboard, { x: pacman.x, y: pacman.y }, { x: blinky.x, y: blinky.y }, config.ghostDirections.blinky);
            config.ghostDirections.blinky = blinkyDirection;
            blinky.move(blinkyDirection);
        }, config.ghostSpeed.blinky * 2);
    }, 1000);
    // rutine for pinky
    setTimeout(() => {
        const pinky = ghosts[1];
        setTimeout(() => { pinky.moveUp(); }, config.ghostSpeed.pinky);
        setTimeout(() => { pinky.moveUp(); }, config.ghostSpeed.pinky * 2);
        setTimeout(() => { pinky.moveUp(); }, config.ghostSpeed.pinky * 3);
        setTimeout(() => {
            setInterval(() => {
                const pacmanDirection = config.pacmanDirection;
                if (pacmanDirection === 'right') {
                    const pacmanX = ((pacman.x + 4) <= gameboard.length) ? gameboard.length : pacman.x + 4;
                    const nextDirection = followThetarget(gameboard, { x: pacmanX, y: pacman.y }, { x: pinky.x, y: pinky.y }, config.ghostDirections.pinky);
                    config.ghostDirections.pinky = nextDirection;
                    pinky.move(nextDirection);
                }
                else if (pacmanDirection === 'left') {
                    const pacmanX = ((pacman.x - 4) <= gameboard.length) ? gameboard.length : pacman.x - 4;
                    const nextDirection = followThetarget(gameboard, { x: pacmanX, y: pacman.y }, { x: pinky.x, y: pinky.y }, config.ghostDirections.pinky);
                    config.ghostDirections.pinky = nextDirection;
                    pinky.move(nextDirection);
                }
                else if (pacmanDirection === 'up') {
                    const pacmanY = ((pacman.y - 4) <= gameboard.length) ? gameboard.length : pacman.y - 4;
                    const nextDirection = followThetarget(gameboard, { x: pacman.x, y: pacmanY }, { x: pinky.x, y: pinky.y }, config.ghostDirections.pinky);
                    config.ghostDirections.pinky = nextDirection;
                    pinky.move(nextDirection);
                }
                else if (pacmanDirection === 'down') {
                    const pacmanY = ((pacman.y + 4) >= gameboard.length) ? gameboard.length : pacman.y + 4;
                    const nextDirection = followThetarget(gameboard, { x: pacman.x, y: pacmanY }, { x: pinky.x, y: pinky.y }, config.ghostDirections.pinky);
                    config.ghostDirections.pinky = nextDirection;
                    pinky.move(nextDirection);
                }
            }, config.ghostSpeed.pinky);
        }, config.ghostSpeed.pinky * 4);
    }, 1500);
    // rutine for inky
    setTimeout(() => {
        const inky = ghosts[2];
        const blinky = ghosts[0];
        setTimeout(() => { inky.moveRight(); }, config.ghostSpeed.inky);
        setTimeout(() => { inky.moveRight(); }, config.ghostSpeed.inky * 2);
        setTimeout(() => { inky.moveUp(); }, config.ghostSpeed.inky * 3);
        setTimeout(() => { inky.moveUp(); }, config.ghostSpeed.inky * 4);
        setTimeout(() => { inky.moveUp(); }, config.ghostSpeed.inky * 5);
        setTimeout(() => {
            setInterval(() => {
                let secondBlockPacman;
                if (config.pacmanDirection === 'right') {
                    secondBlockPacman = { x: pacman.x + 2, y: pacman.y };
                }
                else if (config.pacmanDirection === 'left') {
                    secondBlockPacman = { x: pacman.x - 2, y: pacman.y };
                }
                else if (config.pacmanDirection === 'up') {
                    secondBlockPacman = { x: pacman.x, y: pacman.y - 2 };
                }
                else if (config.pacmanDirection === 'down') {
                    secondBlockPacman = { x: pacman.x, y: pacman.y + 2 };
                }
                else {
                    secondBlockPacman = { x: pacman.x, y: pacman.y };
                }
                const distanceX = Math.abs(secondBlockPacman.x - blinky.x);
                const distanceY = Math.abs(secondBlockPacman.y - blinky.y);
                let targetX = (secondBlockPacman.x > blinky.x) ? blinky.x - distanceX : blinky.x + distanceX;
                let targetY = (secondBlockPacman.y > blinky.y) ? blinky.y - distanceY : blinky.y + distanceY;
                if (targetX < 0)
                    targetX = 0;
                if (targetY < 0)
                    targetY = 0;
                if (targetX > gameboard[0].length - 1)
                    targetX = gameboard[0].length - 1;
                if (targetY > gameboard.length - 1)
                    targetY = gameboard.length - 1;
                const nextDirection = followThetarget(gameboard, { x: targetX, y: targetY }, { x: inky.x, y: inky.y }, config.ghostDirections.inky);
                config.ghostDirections.inky = nextDirection;
                inky.move(nextDirection);
            }, config.ghostSpeed.inky);
        }, config.ghostSpeed.inky * 6);
    }, 3000);
    // clyde rutine
    setTimeout(() => {
        const clyde = ghosts[3];
        setTimeout(() => { clyde.moveLeft(); }, config.ghostSpeed.clyde);
        setTimeout(() => { clyde.moveUp(); }, config.ghostSpeed.clyde * 2);
        setTimeout(() => { clyde.moveUp(); }, config.ghostSpeed.clyde * 3);
        setTimeout(() => { clyde.moveUp(); }, config.ghostSpeed.clyde * 4);
        setTimeout(() => {
            setInterval(() => {
                const distanceToPacman = Math.sqrt(Math.pow(clyde.x - pacman.x, 2) + Math.pow(clyde.y - pacman.y, 2));
                if (distanceToPacman < 8) {
                    const nextDirection = followThetarget(gameboard, { x: 0, y: 31 }, { x: clyde.x, y: clyde.y }, config.ghostDirections.clyde);
                    config.ghostDirections.clyde = nextDirection;
                    clyde.move(nextDirection);
                }
                else {
                    const nextDirection = followThetarget(gameboard, { x: pacman.x, y: pacman.y }, { x: clyde.x, y: clyde.y }, config.ghostDirections.clyde);
                    config.ghostDirections.clyde = nextDirection;
                    clyde.move(nextDirection);
                }
            }, config.ghostSpeed.clyde);
        }, config.ghostSpeed.clyde * 5);
    }, 5000);
}
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
function resetGame() {
    window.location.reload();
}
startGame();
renderGameboard(gameboard);
