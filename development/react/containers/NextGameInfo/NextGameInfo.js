import React, {Component} from 'react'

import './NextGameInfo.css'
import GameInfo from '../../components/GameInfo/GameInfo'
import {
  Icon
} from 'antd'

class NextGameInfo extends Component {
  
  render() {
    const component = this.props.game ? <GameInfo game={ this.props.game } /> : this.renderGameNotFoundMessage()
    const style = {
      flex: this.props.flex ? this.props.flex : '0',
      background: this.props.opacity ? `rgba(0,0,0,${this.props.opacity})` : `rgba(0,0,0,0)`
    }

    return(
      <div 
        className="next-game__section" 
        style={style}
      >
        { component }
      </div>
    )
  }

  renderGameNotFoundMessage = () => {
    return(
      <div className="next-game__error-msg">
        <Icon className="next-game__error-icon" type="exclamation-circle" />
        <h1 className="next-game__error-text">No se encontró un siguiente juego, verifique que existe una partida creada.</h1>
      </div>
    )
  }
}

export default NextGameInfo

