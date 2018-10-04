import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { changeCard, setCurrentGame } from '../store/actions/index'

import Aux from '../components/Aux'
import Card from '../components/Card'
import Background from '../components/Background/Background'
import Panel from '../components/Panel/Panel'
import GridItem from '../components/GridItem/GridItem'
import GameLabel from '../components/GameLabel/GameLabel'
import { socket } from '../../socket'


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

     socket.on( 'BINGO_CONECTED', ( data ) => {
       this.onChangeCard( data.card, data.cardList )
       this.onSetCurrentGame( data.game )
     } )

     socket.on( 'DRAW_CARD', (turn) => {
       this.onChangeCard( turn.turn.card, turn.turn.cardList )
     } )

     socket.on( 'USER_WON', () => {
       this.props.history.push( '/winner' )
     } )

     socket.on( 'START_GAME', ( game ) => {
       console.log( 'game started, current game:', game )
       this.props.game ? null : this.props.onSetCurrentGame( game )
     } )
  }

  onChangeCard = ( card, cardList ) => {
    this.props.onChangeCard( card, cardList )
    this.playAudio( card.audio )
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
    const card = this.props.card ? this.renderGameScreen() : 'Juego no iniciado...'

    return(
      <Aux>
        {card}
      </Aux>
    )
  }

  renderGameScreen = () => {
   return (
    <Background>
      <Panel
        opacity={.15}
        gridTemplateColumns='repeat(4, minmax(min-content, 1fr))'
        gridTemplateRows='repeat(5,min-content)'
      >
        <GridItem
          gridRow="1/2"
          gridColumn="1/-1"
        >
          Loteria Bingo!
        </GridItem>

        <GameLabel 
          gridRow="2/3"
          gridColumn="1/3"
          label="Acomulado:"
          text="$3,789"
          type="important"
        />

        <GridItem
          gridRow="2/3"
          gridColumn="3/-1"
          styles={ { textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', } }
        >
          <p style={ { marginBottom: '-0.5rem', color: '#fff', fontWeight: 300, fontSize: '2.6rem', } }>Juego #67</p>
          <p style={ { marginBottom: '-0.5rem', color: '#F1DB4B', fontWeight: 'bold', fontSize: '3rem', } }>Doble Linea</p>
          <p style={ { marginBottom: '-0.5rem', color: '#fff', fontWeight: 300, fontSize: '2.6rem', } }>200 cartones</p>
        </GridItem>

        <GameLabel 
          gridRow="3/4"
          gridColumn="1/3"
          label="Premio:"
          text="$158"
          type="regular-salmon"
        />

        <GameLabel 
          gridRow="3/4"
          gridColumn="3/-1"
          label="Turno:"
          text="17"
          type="regular-pink"
        />

        <GameLabel 
          gridRow="4/5"
          gridColumn="1/3"
          label="Bingo:"
          text="$278"
          type="regular-green"
        />

        <GameLabel 
          gridRow="5/6"
          gridColumn="1/3"
          label="Patron ganador:"
          customContent={ ( <div style={ { width: '16rem', height: '19rem', background: 'rgba(0, 0, 0, .26)' } }></div> ) }
        />

        <GameLabel 
          gridRow="4/-1"
          gridColumn="3/-1"
          label="Carta actual:"
          customContent={ ( <Card cover="contain" width='16rem' height='25rem' img={ `/static/assets/${this.props.card.image}` } />  ) }
        />

      </Panel>
    </Background>
    )
  }
}

const mapStateToProps = state => {
  return {
    card: state.bng.currentCard,
    cardList: state.bng.cardsList,
    playerWin: state.bng.playerWin,
    game: state.bng.currentGame
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeCard: ( card, cardList ) => dispatch( changeCard( card, cardList ) ),
    onSetCurrentGame: ( game ) => dispatch( setCurrentGame( game ) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BingoGame)