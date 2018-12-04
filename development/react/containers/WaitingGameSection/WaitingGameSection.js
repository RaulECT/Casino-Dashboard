import React, { Component } from 'react'

import Background from '../../components/Background/Background'
import NextGameInfo from '../NextGameInfo/NextGameInfo'
import RandomGame from '../RandomGame/RandomGame'

class WaitingGameSection extends Component {

  render() {
    return(
      <Background display="flexRow" >
        <NextGameInfo 
          flex="1.8"
          opacity={.15}
        />
        
        <RandomGame 
          flex="1"
        />
      </Background>
    )
  }
}

export default WaitingGameSection