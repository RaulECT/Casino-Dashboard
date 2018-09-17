import { START_GAME, END_GAME } from './actions'

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