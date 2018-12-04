import React, { Component, Fragment } from 'react'

import Chronometer from '../Chronometer/Chronometer'

class GameInfo extends Component {
  render() {
    return (
      <Fragment>
        <h1>Proxima Partida:</h1>

        <span className="next-game__text-label">Tipo de Juego:</span>
        <p className="next-game__game-type">DOBLE LINEA</p>

        <span className="next-game__text-label">Precios de Inscripción:</span>
        <ul className="next-game__cardboards-prices">
          <li className="next-game__cardboards-prices--item">$10 Cartilla Simple</li>
          <li className="next-game__cardboards-prices--item">$15 Cartilla Doble</li>
          <li className="next-game__cardboards-prices--item">$20 Cartilla Triple</li>
        </ul>

        <span className="next-game__text-label">Tiempo de espera:</span>
        <Chronometer />
      </Fragment>
    )
  }
}

export default GameInfo