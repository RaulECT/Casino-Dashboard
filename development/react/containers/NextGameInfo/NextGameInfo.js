import React, {Component} from 'react'

class NextGameInfo extends Component {
  render() {
    const style = {
      flex: this.props.flex ? this.props.flex : '0',
      background: this.props.opacity ? `rgba(0,0,0,${this.props.opacity})` : `rgba(0,0,0,0)`
    }

    return(
      <div style={style}>
        <h1>Proxima Partida:</h1>

        <span>Tipo de Juego:</span>
        <p>DOBLE LINEA</p>

        <span>Precios de Inscripción:</span>
        <ul>
          <li>$10 Cartilla Simple</li>
          <li>$15 Cartilla Doble</li>
          <li>$20 Cartilla Triple</li>
        </ul>

        <span>Tiempo de espera:</span>
      </div>
    )
  }
}

export default NextGameInfo

