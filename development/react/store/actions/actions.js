/**
 * ACTIONS
 */
const CHANGE_CARD = 'CHANGE_CARD'

/**
 * ACTIONS FUNCTIONS
 */

export const changeCard = ( card ) => {
  return {
    type: CHANGE_CARD,
    card: card
  }
}