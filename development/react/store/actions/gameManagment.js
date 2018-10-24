import { START_GAME, END_GAME, INCREMENT_TURN, CREATE_GAME_START, CREATE_GAME_SUCCESS, CREATE_GAME_FAIL, VALIDATE_FOLIO_SUCCESS, VALIDATE_FOLIO_START, VALIDATE_FOLIO_FAIL, SET_CONECTION_ID } from './actions'
import { socket } from '../../../socket'
import { changeCard, resetGame } from './bingoGame'
import {notification} from 'antd'
import axios from '../../../axios-bingo'
import { validateCardboard } from './cardboardValidator'

/**
 * MARK: - Variables
 */
const cardsByRow = 4

 /**
  * MARK: - Game Managment Actions
  */
export const startGame = () => {
  return {
    type: START_GAME
  }
}

export const initGame = ( gameId, cardboards, game ) => {
  return (dispatch) => {

    axios.post( '/games/start', {
      id: gameId,
      cardboards: cardboards
    } )
      .then( response => {
 
        if ( response.status === 200 ) {
          socket.emit( 'START_GAME_RQ', {game, cardboards} )
          dispatch( startGame() )

        } else {
          openNotification( 'error', 'Upss, no se ha iniciar la partida', `Ha ocurrido un error mientras se iniciaba la partida. Error:${response.data.error}` )
          dispatch( anounceWinnerFail( response.data ) )
        }
      } )
      .catch( err => {
        console.log( err )
        openNotification( 'error', 'Upss, no se ha podido terminar la partida', `Ha ocurrido un error mientras se terminaba la partida. Error:${err}` )
        dispatch( anounceWinnerFail( err ) )
      } )
  }
}

export const endGame = () => {
  return {
    type: END_GAME
  }
}

export const drawCard = ( card, cardList, history, conectionId ) => {
  return ( dispatch ) => {
    socket.emit( 'DRAW_CARD_RQ', { card: card, cardList:cardList, gameHistory: history, conectionId: conectionId } )
    dispatch( incrementTurn() )
    dispatch( changeCard(card, cardList) )
  }
  
}

export const incrementTurn = () => {
  return {
    type: INCREMENT_TURN
  }
}

export const anounceWinner = ( gameId, cards, winner ) => {
  return ( dispatch ) => {

    axios.post( '/games/end', {
      id: gameId,
      cards: cards,
      winnerCardboard: winner   
    } )
      .then( response => {
    
        if ( response.status === 200 ) {
          socket.emit( 'USER_WON_RQ' )
          // dispatch( endGame() )
          // dispatch( resetGame() )  
          // openNotification( 'success', 'Alguien ha ganado!', `El carton que ingresó ha ganado esta partida de loteria.` )

        } else {
          openNotification( 'error', 'Upss, no se ha podido terminar la partida', `Ha ocurrido un error mientras se terminaba la partida. Error:${response.data}` )
          dispatch( anounceWinnerFail( response.data ) )
        }
        
      } )
      .catch( err => {
        console.log( err )
        openNotification( 'error', 'Upss, no se ha podido terminar la partida', `Ha ocurrido un error mientras se terminaba la partida. Error:${err}` )
        dispatch( anounceWinnerFail( err ) )
      } )

  }
}

export const startCreateGame = () => {

  return {
    type: CREATE_GAME_START
  }
}

export const startGameSuccess = ( onResetFields ) => {
  openNotification( 'success', 'Crear Juego', 'Se ha creado con éxito el juego' )
  onResetFields()

  return {
    type: CREATE_GAME_SUCCESS
  }
}

export const startGameFail = ( error ) => {
  openNotification( 'error', 'Error en crear juego', `Ha ocurrido un error, favor de intentar de nuevo. Error: ${error.error ? error.error : error}` )

  return {
    type: CREATE_GAME_FAIL,
    error: error
  }
}

export const anounceWinnerFail = ( error ) => {

  return {
    type: CREATE_GAME_FAIL,
    error: error
  }
}

export const createGame = ( gameInfo, onResetFields ) => {
  const { doublePrice, electronicPrice, gameDate, gameName, lineConsPrize, linePattern, linePrize, lotteryConsoPrize, lotteryPattern, lotteryPrize, singlePrice, triplePrice } = gameInfo

  return ( dispatch ) => {
    const gameData = { doublePrice, electronicPrice, gameDate, gameName, lineConsPrize, linePattern, linePrize, lotteryConsoPrize, lotteryPattern, lotteryPrize, singlePrice, triplePrice }
    dispatch( startCreateGame() )
   
    axios.post( '/games/create', gameData )
      .then( response => {

        if ( response.status === 200 ) {
          dispatch( startGameSuccess( onResetFields ) )
        } else {
          console.log( response )
          dispatch( startGameFail( response.data ) )
        }

      } )
      .catch( err => {
        console.log(err)
        dispatch( startGameFail( err ) )
      } )
    
    //setTimeout( () => { dispatch( startGameSuccess() ) }, 4000 )
  }
}

export const forceEndGame = ( gameId ) => {
  return dispatch => {

    axios.post( '/games/end', {
      id: gameId,
      cards: [],
      winnerCardboard: parseInt('000000')
    } )
    .then( response => {
      if ( response.status === 200 ) {
        openNotification( 'warning', 'Fin del Juego', 'Se ha forzado el fin del juego.' )
        dispatch( endGame() )
        dispatch( resetGame() )  
        socket.emit( 'FORCE_END_GAME_RQ' )
      } else {
        openNotification( 'error', 'No se ha podido cerrar el juego', 'Ha ocurrido un error y no se ha podido cerrar el juego, por favor intente de nuevo.' )
      }
    } )
    .catch( err => {
      console.log( err )
      openNotification( 'error', 'No se ha podido cerrar el juego', 'Ha ocurrido un error y no se ha podido cerrar el juego, por favor intente de nuevo.' )
    } )
  }
}

export const validateFolio = ( folio, hist, gameType, gameId, callback ) => {
  console.log(hist)
  return dispatch => {
    dispatch( startValidateFolio() )

    axios.post( '/cardboards/get', {
      numcode: parseInt(folio)
    } )
      .then( response => {
        console.log( response )
        if ( response.status === 200 ) {
          //const isWinner = verifyWinner( response.data.result.items[0].card, hist )
          //const isWinner = validateCardboard( response.data.result.items[0].card, gameType, hist )
          // const t = 'DOBLE LINEA'
          // console.log(t)
          const carboardInfo = validateCardboard( response.data.result.items[0].card, gameType, hist )
          dispatch( validateFolioSuccess() )

          if ( carboardInfo.isWinner ) {
            switch ( carboardInfo.pattern ) {
              case 'SINGLE_LINE':
                console.log('holi')
                anounceSingleLineWinner( response.data.result.items[0].card, gameId )
                break;

              case 'DOUBLE_LINE':
                callback()
                break;
            
              default:
                break;
            }

          } else {
            openNotification( 'warning', 'Carton no ganador', 'El folio que ha ingresado no ganado la partida de bingo' )
          }
          
        } else {
          dispatch( validateFolioFail( response.data ) )
        }
      } )
      .catch( err => {
        console.log( err )
        openNotification( 'error', 'Algo ha salido mal', `Ha ocurrido un error durante la validación del folio, favor de intentar de nuevo. Error: ${err}` )
        dispatch( validateFolioFail( err ) )
      } )
  }
}

export const anounceSingleLineWinner = ( cardboard, gameId ) => {
  console.log( cardboard, gameId )
  axios.post('/games/singleWinner', {
    singleWinner: parseInt( cardboard ),
    id: gameId
  })
  .then( response => {
    console.log(response)
    if (response.status === 200) {
      if ( response.data.result === 'Game already has singleWinner' ) {
        openNotification( 'success', 'Carton ganador por linea simple', 'El folio que ha ingresad ha llenado una  linea simple' )

      } else {
        openNotification( 'warning', 'Ya hay un ganador por linea simple', 'Ya hay un ganador registrador por linea simple.' )
      }
    } else {
      console.log( response.data )
      validateFolioFail( response.data )
    }
  } )
  .catch( err => {
    console.log( err )
    validateFolioFail( err )
  } )


}

export const startValidateFolio = () => {
  return {
    type: VALIDATE_FOLIO_START
  }
}

export const validateFolioSuccess = () => {
  return {
    type: VALIDATE_FOLIO_SUCCESS
  }
}

export const validateFolioFail = ( error ) => {
  return {
    type: VALIDATE_FOLIO_FAIL,
    error: error
  }
}

export const setConectionId = ( conectionId ) => {
  return {
    type: SET_CONECTION_ID,
    conectionId: conectionId
  }
}

export const generateConectionId = () => {
  return dispatch => {
    const conection = Math.floor((Math.random() * 1000) + 1)
    dispatch( setConectionId( conection ) )
  }
}

const openNotification = ( type, title, description ) => {
  notification[type]({
    message: title,
    description: description
  })
}

/**
 * ----------------------------------------------------------------------------------------------------
 * MARK: - CARDBOARD VALIDATIONS
 * -----------------------------------------------------------------------------------------------------
 */

// const verifyWinner = ( cardboard, hist ) => {
// 	if( isWinnerPerRow( cardboard, hist ) ) {
//     console.log( 'Gano por linea!' )
//     return true
//   } else if( isWinnerPerCol( cardboard, hist ) ) {
//     console.log('Gano por columna')
//     return true
//   } else if( isWinnerPerDiag( cardboard, hist ) ) {
//     console.log( 'Gano por diagonal' )
//     return true
//   } else {
//     console.log( 'No gano' )
//     return false
//   }

//   return false
// }

// const isWinnerPerRow = ( cardboard, hist ) => {
// 	let currentRow = []
  
//   for( let index = 0; index < cardsByRow; index++ ) {
//   	currentRow = cardboard[index]
    
//     if( ( hist.indexOf( currentRow[0] ) !== -1 ) &&
//     		( hist.indexOf( currentRow[1] ) !== -1 ) &&
//         ( hist.indexOf( currentRow[2] ) !== -1 ) &&
//         ( hist.indexOf( currentRow[3] ) !== -1 ) ) {
//     	return true
//     }
//   }
  
//   return false
// }

// const isWinnerPerCol = ( cardboard, hist ) => {
// 	let currentCol = []
  
//   for( let index = 0; index < cardsByRow; index++ ) {
//   	if( ( hist.indexOf( cardboard[0][index] ) !== -1 ) &&
//     		( hist.indexOf( cardboard[1][index] ) !== -1 ) &&
//         ( hist.indexOf( cardboard[2][index] ) !== -1 ) &&
//         ( hist.indexOf( cardboard[3][index] ) !== -1 ) ) {
//     	return true
//     }
//   }
  
//   return false
// }

// const isWinnerPerDiag = ( cardboard, hist ) => {
// 	if( ( hist.indexOf( cardboard[0][0] ) !== -1 ) &&
//   		( hist.indexOf( cardboard[1][1] ) !== -1 ) &&
//       ( hist.indexOf( cardboard[2][2] ) !== -1 ) &&
//       ( hist.indexOf( cardboard[3][3] ) !== -1 ) ) {
//   	return true
//   } else if( ( hist.indexOf( cardboard[0][3] ) !== -1 ) &&
//   		( hist.indexOf( cardboard[1][2] ) !== -1 ) &&
//       ( hist.indexOf( cardboard[2][1] ) !== -1 ) &&
//       ( hist.indexOf( cardboard[3][0] ) !== -1 ) ) {
//   	return true
//   }
  
//   return false
// }