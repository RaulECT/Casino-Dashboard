import React, {Component} from 'react'

import './NextGameInfo.css'
import Chronometer from '../../components/Chronometer/Chronometer'

class NextGameInfo extends Component {
  render() {
    const style = {
      flex: this.props.flex ? this.props.flex : '0',
      background: this.props.opacity ? `rgba(0,0,0,${this.props.opacity})` : `rgba(0,0,0,0)`
    }

    return(
      <div 
        className="next-game__section" 
        style={style}
      >
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
      </div>
    )
  }
}

export default NextGameInfo

