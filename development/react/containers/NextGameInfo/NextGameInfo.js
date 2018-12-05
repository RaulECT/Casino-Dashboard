import React, {Component} from 'react'
import { openConnection } from '../../../socket'

import './NextGameInfo.css'
import GameInfo from '../../components/GameInfo/GameInfo'
import GameNotFoundMessage from '../../components/GameNotFoundMessage/GameNotFoundMessage'

class NextGameInfo extends Component {

  componentDidMount() {
    this.socket = openConnection()
  }

  componentWillUnmount() {
    this.socket.close()
  }

  sendGameStartNotiication = () => {
    this.socket.emit( 'SHOW_START_GAME_NOTIFICATION_RQ' )
  }
  
  render() {
    const component = this.props.game ? <GameInfo onEndTime={ this.sendGameStartNotiication } game={ this.props.game } /> : <GameNotFoundMessage />
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

