import React, {Component} from 'react'

import GameNotFoundMessage from '../../components/GameNotFoundMessage/GameNotFoundMessage'

class RandomGame extends Component {
  render() {
    const component = this.props.games ? 'RandomGame...' : <GameNotFoundMessage message='No se encontraron partidas activas.' />
    const style = {
      flex: this.props.flex ? this.props.flex : '0'
    }

    return(
      <div style={style}>
        {component}
      </div>
    )
  }

  

}

export default RandomGame