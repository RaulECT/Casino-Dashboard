/**
 * ACTIONS
 */
export const CHANGE_CARD = 'CHANGE_CARD'

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