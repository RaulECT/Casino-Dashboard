import React, { Component, Fragment } from 'react'
import { openConnection } from '../../../socket'
import { COUNTDOWN_START_TIME } from '../../../../config/config'

import Chronometer from '../Chronometer/Chronometer'
import GameNotFoundMessage from '../../components/GameNotFoundMessage/GameNotFoundMessage'

class GameInfo extends Component {

  state = {
    isCountdownStarted: false
  }

  componentDidMount() {
    this.socket = openConnection()

    this.socket.on( 'COUNTDOWN_STARTED', () => {
      this.setState( { isCountdownStarted: true } )
    } )
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    const simpleCardboardPrice = this.props.game.singlePrice / 100
    const doubleCardboardPrice = this.props.game.doublePrice / 100
    const tripleCardboardPrice = this.props.game.triplePrice / 100
    const chronometerSection = this.state.isCountdownStarted ? <Chronometer type="global" onEndTime={this.props.onEndTime} timeStart={ COUNTDOWN_START_TIME } /> : <GameNotFoundMessage message="No se ha iniciado la cuenta para la partida." />

    return (
      <Fragment>
        <h1>Proxima Partida:</h1>

        <span className="next-game__text-label">Tipo de Juego:</span>
        <p className="next-game__game-type"> { this.props.game.gameName } </p>

        <span className="next-game__text-label">Precios de Inscripción:</span>
        <ul className="next-game__cardboards-prices">
          <li className="next-game__cardboards-prices--item">{`$${simpleCardboardPrice} Cartilla Simple`}</li>
          <li className="next-game__cardboards-prices--item">{`$${doubleCardboardPrice} Cartilla Doble`}</li>
          <li className="next-game__cardboards-prices--item">{`$${tripleCardboardPrice} Cartilla Triple`}</li>
        </ul>

        <span className="next-game__text-label">Tiempo de espera:</span>
        { chronometerSection }
      </Fragment>
    )
  }
}

export default GameInfo