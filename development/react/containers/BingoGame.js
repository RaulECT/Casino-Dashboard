import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { changeCard } from '../store/actions/index'

import Aux from '../components/Aux'
import Card from '../components/Card'
import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:3000')


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

     socket.on( 'START_GAME', () => {
       this.getRandomCard()
     } )

     socket.on( 'DRAW_CARD', () => {
       this.getRandomCard()
     } )

     socket.on( 'USER_WON', () => {
       this.props.history.push( '/winner' )
     } )
  }

  getRandomCard = () => {
    //TODO: REPLACE WITH RANDOM FUNCTION LATELY
    const randomNumber = Math.floor(Math.random() * (this.props.cardList.length - 0 + 1)) + 0; 
    const randomCard = this.props.cardList[randomNumber]
    const cardsUpdated = this.props.cardList.filter( ( element, index ) => index !== randomNumber  )

    this.props.onChangeCard( randomCard, cardsUpdated )
    this.playAudio( randomCard.audio )
  }

  playAudio = ( audioFile ) => {
    const audio = new Audio( `/static/assets/audio/${audioFile}` )
    audio.play()
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