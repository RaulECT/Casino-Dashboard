import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { changeCard, setCurrentGame, setGameHistory, resetGame, forceEndGame } from '../store/actions/index'

import Aux from '../components/Aux'
import Card from '../components/Card'
import Background from '../components/Background/Background'
import Panel from '../components/Panel/Panel'
import GridItem from '../components/GridItem/GridItem'
import GameLabel from '../components/GameLabel/GameLabel'
import RecentCardsSection from './RecentCardsSection/RecentCardsSection'
import CardboardPattern from '../components/CardboardPattern/CardboardPattern'
import { socket } from '../../socket'
import './BingoGame.css'


class BingoGame extends Component {

  componentDidMount() {

    //TODO: REPLACE WITH SOCKETIO
    addEventListener( "keypress", (e) => { 
      if ( e.which === 13 || e.keyCode === 13 ) {
        this.getRandomCard()
      }
     } )

     socket.on( 'BINGO_CONECTED', ( data ) => {
       this.props.onSetGameHistory( data.gameHistory )
       this.onChangeCard( data.card, data.cardList )
       this.props.onSetCurrentGame( data.game )
     } )

     socket.on( 'DRAW_CARD', (turn) => {
      this.onChangeCard( turn.turn.card, turn.turn.cardList )
     } )

     socket.on( 'USER_WON', () => {
      const lastCard = { ...this.props.card }

      this.props.history.push( {
        pathname: '/winner',
        state: { card: lastCard }
      } )
      this.props.onEndGame()
     } )

     socket.on( 'START_GAME', ( game ) => {
       this.props.game ? null : this.props.onSetCurrentGame( game )
     } )

     socket.on( 'FORCE_END_GAME', () => {
       this.props.onEndGame()
     } )
  }

  onChangeCard = ( card, cardList ) => {
    this.props.onChangeCard( card, cardList )
    this.playAudio( card.audio )
  }

  getRandomCard = () => {
    //TODO: REPLACE WITH RANDOM FUNCTION LATELY
    const randomNumber = Math.floor(Math.random() * (this.props.cardList.length - 0)) + 0; 
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
    <Background
      grid
    >
      <Panel
        opacity={.15}
        gridTemplateColumns='repeat(4, minmax(min-content, 1fr))'
        gridTemplateRows='repeat(5,min-content)'
        rowGap='1rem'
        columnGap="3rem"
        className="bingo-game__panel"
      >
        <GridItem
          gridRow="1/2"
          gridColumn="1/-1"
          className="bingo-game__title"
        >
          Loteria Bingo!
        </GridItem>

        <GameLabel 
          gridRow="2/3"
          gridColumn="1/3"
          label="Acumulado:"
          text="$3,789"
          type="important"
        />

        <GridItem
          gridRow="2/3"
          gridColumn="3/-1"
          styles={ { textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', } }
        >
          <p className="bingo-game__game-details">Juego #{ this.props.game ? this.props.game.index : '' }</p>
          <p className="bingo-game__game-name">{ this.props.game ? this.props.game.gameName : '' }</p>
          <p className="bingo-game__game-details">{ this.props.game ? this.props.game.cardboards.length : '' } cartones</p>
        </GridItem>

        <GameLabel 
          gridRow="3/4"
          gridColumn="1/3"
          label="Premio:"
          text={ `$${this.props.game ? ( this.props.game.linePrize / 100 ) : ''}` }
          type="regular-salmon"
        />

        <GameLabel 
          gridRow="3/4"
          gridColumn="3/-1"
          label="Turno:"
          text={ `${this.props.gameHistory.length}` }
          type="regular-pink"
        />

        <GameLabel 
          gridRow="4/5"
          gridColumn="1/3"
          label="Bingo:"
          text={`$${this.props.game ? ( this.props.game.lotteryPrize / 100 ) : ''}`}
          type="regular-green"
        />

        <GameLabel 
          gridRow="5/6"
          gridColumn="1/3"
          label="Patrón ganador:"
          customContent={ ( 
            <div className="pattern-responsive" style={ { width: '23rem', height: '23rem', background: 'rgba(0, 0, 0, .26)' } }>
              <CardboardPattern 
                gameType={this.props.game ? this.props.game.linePattern : 'LINEA'}
              />
            </div> 
          ) }
        />

        <GameLabel 
          gridRow="4/-1"
          gridColumn="3/-1"
          label="Carta actual:"
          customContent={ ( <Card isResponsive cover="contain" width='20rem' height='31rem' img={ `/static/assets/${this.props.card.image}` } />  ) }
        />

      </Panel>

      <RecentCardsSection 
        cards={ this.props.gameHistory }
        gameType={ this.props.linePattern }
      />
    </Background>
    )
  }
}

const mapStateToProps = state => {
  return {
    card: state.bng.currentCard,
    cardList: state.bng.cardsList,
    playerWin: state.bng.playerWin,
    game: state.bng.currentGame,
    gameHistory: state.bng.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeCard: ( card, cardList ) => dispatch( changeCard( card, cardList ) ),
    onSetCurrentGame: ( game ) => dispatch( setCurrentGame( game ) ),
    onSetGameHistory: ( gameHistory ) => dispatch( setGameHistory( gameHistory ) ),
    onEndGame: () => dispatch( resetGame() ),
    onForceEndGame: () => dispatch( forceEndGame() ) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BingoGame)