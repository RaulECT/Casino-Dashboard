import { validateCardboard } from './cardboardValidator'

describe( 'validateCardboard shuold validate double cardboards', () => {
  let cardbaord 
  let gameType
  let history

  beforeEach( () => {
    history = [ 1, 3, 5, 6, 8 ]
    gameType = 'SINGLE_LINE'
    cardbaord = [
      [
        [ 48, 5, 53, 1 ],
        [ 39, 46, 13, 14 ],
        [ 51, 29, 44, 2 ],
        [ 25, 23, 26, 45 ]
      ],
      [
        [ 7, 49, 12, 24 ],
        [ 15, 6, 13, 51 ],
        [ 30, 14, 22, 21 ],
        [ 43, 27, 41, 31 ]
      ],
    ]
    
  } )

  it( 'should return no winner', () => {
    expect( validateCardboard( cardbaord, gameType, history ) ).toEqual( { isWinner: false } )
  } )

  it( 'should return winner cardboard with single line pattern on left place', () => {
    const result = validateCardboard( cardbaord, gameType , [ 1, 9, 3, 13, 5, 12, 15, 29, 1, 7, 25, 19 ] )
    const correctAnswer = { isWinner: true, pattern: 'SINGLE_LINE', winnerRow: [ 3, 6, 9, 12 ] }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'shold return winner carboard with double line pattern on left place', () => {
    const result = validateCardboard( cardbaord, gameType, [ 10, 25, 9, 23, 6, 26, 28, 45, 33, 1, 11, 14, 41, 2, 37, 40 ] )
    const correctAnswer = { isWinner: true, pattern: 'DOUBLE_LINE', winnerRow: [ 12, 13, 14, 15, 3, 7, 11 ] }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with single line pattern on right place', () => {
    const result = validateCardboard( cardbaord, gameType, [ 1, 24, 11, 13, 33, 14, 29, 43 ] )
    const correctAnswer = { isWinner: true, pattern: 'SINGLE_LINE', winnerRow: [ 3, 6, 9, 12 ] }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with double line pattern on right place', () => {
    const result = validateCardboard( cardbaord, gameType, [ 7, 6, 22, 31, 24, 13, 14, 43 ] )
    const correctAnswer = { isWinner: true, pattern: 'DOUBLE_LINE', winnerRow: [ 0, 5, 10, 15, 3, 6, 9, 12 ] }
  
    
    expect( result ).toEqual( correctAnswer )
  } )

} )

describe( 'validateCardboard should validate triple cardboards', () => {
  let cardbaord
  let gameType
  let history

  beforeEach( () => {
    history = [ 8, 25, 43, 1, 9 ]
    gameType = 'SINGLE_LINE'
    cardbaord = [
      [
        [19, 37, 13, 30],
        [10, 20, 11, 47],
        [17, 49, 15, 34],
        [32, 22, 31, 27]
      ],
      [
        [17, 10, 50, 53],
        [7, 24, 25, 15],
        [0, 8, 35, 12],
        [6, 19, 51, 34]
      ],
      [
        [38, 16, 29, 45],
        [15, 4, 52, 46],
        [42, 34, 9, 31],
        [11, 19, 14, 53]
      ],
    ]
  } )

  it( 'should return no winner', () => {
    const result = validateCardboard( cardbaord, gameType, history )
    const correctAnswer = { isWinner: false }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with single line pattern on left place', () => {
    const result = validateCardboard( cardbaord, 'SINGLE_LINE', [ 19, 18, 37, 30, 10, 13 ] )
    const correctAnswer = { isWinner: true, pattern: 'SINGLE_LINE', winnerRow: [ 0, 1, 2, 3 ] }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with double line  pattern on left place', () => {
    const result = validateCardboard( cardbaord, 'DOUBLE_LINE', [ 31, 15, 11, 13, 47, 10, 20 ] )
    const correctAnswer = { isWinner: true, pattern: 'DOUBLE_LINE', winnerRow: [4, 5, 6, 7, 2, 10, 14] }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with single line pattern on middle place', () => {
    const result = validateCardboard( cardbaord, 'SINGLE_LINE', [ 6, 45, 8, 78, 3, 25, 2, 53, 10 ] )
    const correctAnswer = { isWinner: true, pattern: 'SINGLE_LINE', winnerRow: [ 3, 6, 9, 12 ] }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with double line pattern on middle place', () => {
    const result = validateCardboard( cardbaord, 'DOUBLE_LINE', [ 17, 7, 0, 6, 10, 24, 8, 19 ] )
    const correctAnswer = { isWinner: true, pattern: 'DOUBLE_LINE', winnerRow: [ 0, 4, 8, 12, 1, 5, 9, 13 ] }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with single line pattern on right place', () => {
    const result = validateCardboard( cardbaord, 'SINGLE_LINE', [ 45, 46, 31, 53 ] )
    const correctAnswer = { isWinner: true, pattern: 'SINGLE_LINE', winnerRow: [ 3, 7, 11, 15 ] }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with double line pattern on right plcae', () => {
    const result = validateCardboard( cardbaord, 'DOUBLE_LINE', [ 42, 34, 9, 31, 11, 19, 14, 53 ] )
    const correctAnswer = { isWinner: true, pattern: 'DOUBLE_LINE', winnerRow: [ 8, 9, 10, 11, 12, 13, 14, 15 ] }

    expect( result ).toEqual( correctAnswer )
  } )
} )

describe( 'validateCardboard should validate single cardboards', () => {
  let cardbaord
  let gameType
  let history

  beforeEach( () => {
    gameType = 'SINGLE_LINE'
    history = [ 6, 34, 2, 55 ]
    cardbaord = [
      [
        [ 23, 12, 8, 26 ],
        [ 11, 35, 49, 3 ],
        [ 33, 30, 28, 7 ],
        [ 9, 1, 37, 5 ],
      ]
    ]
  } )

  it( 'should return no winner', () => {
    const result = validateCardboard( cardbaord, gameType, history )
    const correctAnswer = { isWinner: false }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with single line pattern', () => {
    const result = validateCardboard( cardbaord, gameType, [ 23, 35, 28, 5 ] )
    const correctAnswer = { isWinner: true, pattern: 'SINGLE_LINE', winnerRow: [ 0, 5, 10, 15 ] }

    expect( result ).toEqual( correctAnswer )
  } )

  it( 'should return winner cardboard with double line pattern', () => {
    const result = validateCardboard( cardbaord, 'DOUBLE_LINE', [ 12, 8, 35, 49, 30, 28, 1, 37 ] )
    const correctAnswer = { isWinner: true, pattern: 'DOUBLE_LINE', winnerRow: [1, 5, 9, 13, 2, 6, 10, 14]}

    expect( result ).toEqual( correctAnswer )
  } )
} )