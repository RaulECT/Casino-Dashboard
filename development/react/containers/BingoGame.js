import React, {Component} from 'react'

import Aux from '../components/Aux'
import Card from '../components/Card'

const card1 = '/static/assets/card1.png'

class BingoGame extends Component {

  render() {
    return(
      <Aux>
        <Card 
          img={card1}
        />
      </Aux>
    )
  }
}

export default BingoGame