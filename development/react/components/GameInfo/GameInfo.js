import React, { Component, Fragment } from 'react'

import Chronometer from '../Chronometer/Chronometer'

class GameInfo extends Component {
  render() {
    const simpleCardboardPrice = this.props.game.singlePrice / 100
    const doubleCardboardPrice = this.props.game.doublePrice / 100
    const tripleCardboardPrice = this.props.game.triplePrice / 100

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
        <Chronometer />
      </Fragment>
    )
  }
}

export default GameInfo