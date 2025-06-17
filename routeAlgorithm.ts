export function followTheGoal (
  // gameboard: Array<Array<number | string>>,
  // goal: { x: number, y: number },
  currentPosition: { x: number, y: number },
  currentDirection: string): string {
  // ghost can go back so lest get the posible moves
  let posibleMoves = ['right', 'left', 'up', 'down']

  let posibleMovesCordinates: Array<{ direction: string, x: number, y: number } | undefined> = [
    { direction: 'right', x: currentPosition.x + 1, y: currentPosition.y },
    { direction: 'left', x: currentPosition.x - 1, y: currentPosition.y },
    { direction: 'up', x: currentPosition.x, y: currentPosition.y - 1 },
    { direction: 'down', x: currentPosition.x, y: currentPosition.y + 1 }
  ]

  if (currentDirection === 'right') {
    posibleMoves = ['left', 'up', 'down']
  } else if (currentDirection === 'left') {
    posibleMoves = ['right', 'up', 'down']
  } else if (currentDirection === 'up') {
    posibleMoves = ['right', 'left', 'down']
  } else if (currentDirection === 'down') {
    posibleMoves = ['right', 'left', 'up']
  }

  // now lets get the cordinates for the posible moves
  posibleMovesCordinates = posibleMovesCordinates.filter((move, index) => {
    if (move !== undefined && move.direction === posibleMoves[index - 1]) {
      return { direction: move.direction, x: move.x, y: move.y }
    }
    return undefined
  })

  return 'hola'
}
