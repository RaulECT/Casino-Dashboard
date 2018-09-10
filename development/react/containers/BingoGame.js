import React, {Component} from 'react'
import { connect } from 'react-redux'
import { changeCard } from '../store/actions/actions'

import Aux from '../components/Aux'
import Card from '../components/Card'

const card1 = '/static/assets/card1.png'

class BingoGame extends Component {

  constructor( props ) {
    super( props )
  }

  render() {
    const card = this.props.card ? 
      <Card 
        img={ `/static/assets/${this.props.card.image}` } 
      /> 
      : 'Juego no iniciado...'

    return(
      <Aux>
        {card}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    card: state.bng.currentCard,
    cardList: state.bng.cardsList,
    playerWin: state.bng.playerWin
  }
}

export default connect(mapStateToProps)(BingoGame)