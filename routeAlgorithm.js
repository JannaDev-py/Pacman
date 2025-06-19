export function followThetarget(gameboard, target, currentPosition, currentDirection) {
    // ghost can go back so lest get the posible moves
    let posibleMoves = ['up', 'left', 'down', 'right'];
    if (currentDirection === 'up') {
        posibleMoves = posibleMoves.filter((move) => { return move !== 'down'; });
    }
    else if (currentDirection === 'down') {
        posibleMoves = posibleMoves.filter((move) => { return move !== 'up'; });
    }
    else if (currentDirection === 'left') {
        posibleMoves = posibleMoves.filter((move) => { return move !== 'right'; });
    }
    else if (currentDirection === 'right') {
        posibleMoves = posibleMoves.filter((move) => { return move !== 'left'; });
    }
    let posibleMovesCordinates = [
        { direction: 'up', x: currentPosition.x, y: currentPosition.y - 1 },
        { direction: 'left', x: currentPosition.x - 1, y: currentPosition.y },
        { direction: 'down', x: currentPosition.x, y: currentPosition.y + 1 },
        { direction: 'right', x: currentPosition.x + 1, y: currentPosition.y }
    ];
    // now lets get the cordinates for the posible moves
    posibleMovesCordinates = posibleMovesCordinates.filter((move, index) => {
        if (move !== undefined && posibleMoves.includes(move.direction)) {
            return move;
        }
        return undefined;
    }).filter(Boolean);
    const posibleMovesOnGameboard = posibleMovesCordinates.map((move) => {
        if ((gameboard[move.y][move.x] === 3 ||
            gameboard[move.y][move.x] === 'P' ||
            gameboard[move.y][move.x] === 'b' ||
            gameboard[move.y][move.x] === 'i' ||
            gameboard[move.y][move.x] === 'c') &&
            move.direction === 'down') {
            return undefined;
        }
        if (gameboard[move.y][move.x] !== 1) {
            return move;
        }
        return undefined;
    }).filter(Boolean);
    if (posibleMovesOnGameboard.length === 1 && posibleMovesOnGameboard[0] !== undefined) {
        return posibleMovesOnGameboard[0].direction;
    }
    // one we got the posible moves we can go to the target
    // frist lest get the distance between the posible moves and the target
    const distances = posibleMovesOnGameboard.map((move) => {
        const x = Math.abs(move.x - target.x);
        const y = Math.abs(move.y - target.y);
        const distance = Math.sqrt(x * x + y * y);
        return { direction: move.direction, distance };
    });
    // lets get the move to the smallest distance
    const nextMove = distances.reduce((min, obj) => obj.distance < min.distance ? obj : min, distances[0]);
    return nextMove.direction;
}
