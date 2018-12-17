import { validateCardboard } from './cardboardValidator'

describe( 'validateCardboard shuold validate double cardboards on single line game', () => {
  let cardbaord 
  let gameType
  let history

  beforeEach( () => {
    history = [ 1, 3, 5, 6, 8 ]
    gameType = 'SINGLE_LINE'
    cardbaord = [
      [
        [ 1, 2, 3, 20 ],
        [ 4, 5, 6, 7 ],
        [ 8, 9, 10, 11 ],
        [ 12, 13, 14, 15 ]
      ],
      [
        [ 2, 1, 0, 3 ],
        [ 5, 7, 4, 6 ],
        [ 11, 8, 11, 10 ],
        [ 15, 12, 14, 13 ]
      ],
    ]
    
  } )

  it( 'should return cardboard no winner', () => {
    expect( validateCardboard( cardbaord, gameType, history ) ).toEqual( { isWinner: false } )
  } )

  it( 'should return cardboard winner with single line', () => {
    const result = validateCardboard( cardbaord, gameType , [ 2, 34, 7, 6, 5, 4, 20 ] )
    const correctAnswer = { isWinner: true, pattern: 'SINGLE_LINE', winnerRow: [ 4, 5, 6, 7 ] }

    expect( result ).toEqual( correctAnswer )
  } )
} )