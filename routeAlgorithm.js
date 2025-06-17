export function followTheGoal(gameboard, 
// goal: { x: number, y: number },
currentPosition, currentDirection) {
    // ghost can go back so lest get the posible moves
    let posibleMoves = ['right', 'left', 'up', 'down'];
    let posibleMovesCordinates = [
        { direction: 'right', x: currentPosition.x + 1, y: currentPosition.y },
        { direction: 'left', x: currentPosition.x - 1, y: currentPosition.y },
        { direction: 'up', x: currentPosition.x, y: currentPosition.y - 1 },
        { direction: 'down', x: currentPosition.x, y: currentPosition.y + 1 }
    ];
    if (currentDirection === 'right') {
        posibleMoves = ['left', 'up', 'down'];
    }
    else if (currentDirection === 'left') {
        posibleMoves = ['right', 'up', 'down'];
    }
    else if (currentDirection === 'up') {
        posibleMoves = ['right', 'left', 'down'];
    }
    else if (currentDirection === 'down') {
        posibleMoves = ['right', 'left', 'up'];
    }
    // now lets get the cordinates for the posible moves
    posibleMovesCordinates = posibleMovesCordinates.filter((move, index) => {
        if (move !== undefined && posibleMoves.includes(move.direction)) {
            return { direction: move.direction, x: move.x, y: move.y };
        }
        return undefined;
    });
    // now lets see if we can go to the posible moves
    const posibleMovesOnGameboard = posibleMovesCordinates.map((move) => {
        if (move !== undefined) {
            if (gameboard[move.y][move.x] !== 1) {
                const tempMove = move.direction;
                return tempMove;
            }
        }
        return undefined;
    }).filter(Boolean);
    if (posibleMovesOnGameboard.length === 1) {
        return posibleMovesOnGameboard[0];
    }
    return 'hola';
}
