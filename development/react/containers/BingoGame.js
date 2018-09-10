import React, {Component} from 'react'
import { connect } from 'react-redux'
import { changeCard } from '../store/actions/actions'

import Aux from '../components/Aux'
import Card from '../components/Card'


class BingoGame extends Component {

  constructor( props ) {
    super( props )


  }

  componentDidMount() {

    //TODO: REPLACE WITH SOCKETIO
    addEventListener( "keypress", (e) => { 
      if ( e.which === 13 || e.keyCode === 13 ) {
        this.getRandomCard()
      }
     } )
  }

  getRandomCard = () => {
    const randomNumber = Math.floor(Math.random() * (this.props.cardList.length - 0 + 1)) + 0;
    const randomCard = this.props.cardList[randomNumber]

    this.props.onChangeCard( randomCard, this.props.cardList )
 
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

const mapDispatchToProps = dispatch => {
  return {
    onChangeCard: ( card, cardList ) => dispatch( changeCard( card, cardList ) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BingoGame)