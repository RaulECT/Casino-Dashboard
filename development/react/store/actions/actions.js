/**
 * ACTIONS
 */
export const CHANGE_CARD = 'CHANGE_CARD'
export const START_GAME = 'START_GAME'
export const END_GAME = 'END_GAME'

/**
 * ACTIONS FUNCTIONS
 */

export const changeCard = ( card, cardList ) => {
  return {
    type: CHANGE_CARD,
    card: card,
    cardList: cardList
  }
}

export const startGame = () => {
  return {
    type: START_GAME
  }
}

export const endGame = () => {
  return {
    type: END_GAME
  }
}