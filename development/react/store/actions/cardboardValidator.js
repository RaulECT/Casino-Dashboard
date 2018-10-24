export const validateCardboard = ( cardboard, gameType, cardsHistory ) => {
	const cardboardFormatted = formatCardboard( cardboard, gameType )
  
  for( let i = 0; i < cardboardFormatted.length; i++ ) {
  	const isWinnerRow = verifyRow( cardboardFormatted[i], cardsHistory )
    
    if ( isWinnerRow ) {
      console.log( isWinnerRow, cardboardFormatted[i] )
      let winnerPattern = ''

      switch ( cardboardFormatted[i].length ) {
        case 4:
          winnerPattern = 'SINGLE_LINE'
          break;

        case 7:
          winnerPattern = 'DOUBLE_LINE'
          break
      
        default:
          winnerPattern = 'SINLGE_LINE'
          break;
      }
      const winnerInfo = { isWinner: true, pattern: winnerPattern, winnerRow: cardboardFormatted[i] }
      console.log( winnerInfo )
      return winnerInfo
      //return true
    }
  }
  const winnerInfo = { isWinner: false }
  console.log(winnerInfo)
  return winnerInfo
  //return false
}

const formatCardboard = ( cardboard, gameType ) => {

  
  switch( gameType ) {
  	case 'LINEA':
      //return formatLinealCrdboard( cardboard )	
      return formatDoubleLineal()
    	break
      
    case 'DOBLE LINEA':
    	return formatDoubleLineal()
  
  	default:
			//return formatLinealCrdboard( cardboard )	
			return formatDoubleLineal()	
    	break
  }
  
}

const formatLinealCrdboard = ( cardboard ) => {
		let cardboardFormatted = [ ...cardboard ]
  
  for( let i = 0; i < 4; i++ ) {
    cardboardFormatted.push( [ cardboard[0][i], cardboard[1][i], cardboard[2][i], cardboard[3][i] ] )
    
  }
  
  	cardboardFormatted.push( [ cardboard[0][0], cardboard[1][1], cardboard[2][2], cardboard[3][3] ] )
    cardboardFormatted.push( [ cardboard[0][3], cardboard[1][2], cardboard[2][1], cardboard[3][0] ] )
    
    return cardboardFormatted
}

const formatDoubleLineal = () => {
	return [
      [ 0, 1, 2, 3, 4, 8, 12 ],
      [ 0, 1, 2, 3, 5, 9, 13 ],
      [ 0, 1, 2, 3, 6, 10, 14 ],
      [ 0, 1, 2, 3, 7, 11, 15 ],
      [ 4, 5, 6, 7, 0, 8, 12 ],
      [ 4, 5, 6, 7, 1, 9, 13 ],
      [ 4, 5, 6, 7, 2, 10, 14 ],
      [ 4, 5, 6, 7, 3, 11, 15 ],
      [ 8, 9, 10, 11, 0, 4, 12 ],
      [ 8, 9, 10, 11, 1, 5, 13 ],
      [ 8, 9, 10, 11, 2, 6, 14 ],
      [ 8, 9, 10, 11, 3, 7, 15 ],
      [ 12, 13, 14, 15, 0, 4, 8 ],
      [ 12, 13, 14, 15, 1, 5, 9 ],
      [ 12, 13, 14, 15, 2, 6, 10 ],
      [ 12, 13, 14, 15, 3, 7, 11 ],
      [ 0, 1, 2, 3, 4, 5, 6, 7 ],
      [ 8, 9, 10, 11, 12, 13, 14, 15 ],
      [ 0, 4, 8, 12, 1, 5, 9, 13 ],
      [ 2, 6, 10, 14, 3, 7, 11, 15 ],
      [ 0, 4, 8, 12, 2, 6, 10, 14 ],
      [ 0, 4, 8, 12, 3, 7, 11, 15 ],
      [ 1, 5, 9, 13, 2, 6, 10, 14 ],
      [ 1, 5, 9, 13, 3, 7, 11, 15 ],
      [ 0, 1, 2, 3, 8, 9, 10, 11 ],
      [ 0, 1, 2, 3, 12, 13, 14, 15 ],
      [ 4, 5, 6, 7, 8, 9 , 10, 11 ],
      [ 4, 5, 6, 7, 12, 13, 14, 15 ],
      [ 0, 1, 2, 3],
      [ 4, 5, 6, 7 ],
      [ 8, 9, 10, 11 ],
      [ 12, 13, 14, 15 ],
      [ 0, 4, 8, 12 ],
      [ 1, 5, 9, 13 ],
      [ 2, 6, 10, 14 ],
      [ 3, 7, 11, 15 ],
      [ 0, 5, 10, 15 ],
      [ 3, 6, 9, 12 ],
    ]
}

const verifyRow = ( row, cardHistory ) => {
	let cardsDrawed = []
  
  row.map( element => {
  	cardHistory.indexOf( element ) !== -1 ? cardsDrawed.push( element ) : null
  } )
  
  return row.length === cardsDrawed.length
}

