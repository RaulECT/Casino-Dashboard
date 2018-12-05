import React, {Component} from 'react'

import './NextGameInfo.css'
import GameInfo from '../../components/GameInfo/GameInfo'
import GameNotFoundMessage from '../../components/GameNotFoundMessage/GameNotFoundMessage'

class NextGameInfo extends Component {
  
  render() {
    const component = this.props.game ? <GameInfo game={ this.props.game } /> : <GameNotFoundMessage />
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
}

export default NextGameInfo

