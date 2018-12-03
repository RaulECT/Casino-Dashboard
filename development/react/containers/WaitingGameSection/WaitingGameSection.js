import React, { Component } from 'react'

import Background from '../../components/Background/Background'
import NextGameInfo from '../NextGameInfo/NextGameInfo'
import RandomGame from '../RandomGame/RandomGame'

class WaitingGameSection extends Component {

  render() {
    return(
      <Background>
        <div>
          <NextGameInfo />
        </div>
        
        <div>
          <RandomGame />
        </div>
      </Background>
    )
  }
}

export default WaitingGameSection