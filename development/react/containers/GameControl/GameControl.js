import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  startGame, 
  endGame, 
  initGame, 
  drawCard, 
  anounceWinner, 
  loadCurrentGame,
  changeCard

} from '../../store/actions/index'

import './GameControl.css'
import Aux from '../../components/Aux'
import Card from '../../components/Card'
import {
  Button,
  Input,
  notification,
  Skeleton,
  Row,
  Col
} from 'antd'


const Search = Input.Search

class GameControl extends Component {

  componentDidMount() {
    this.props.onLoadGame()
  }

  handleOnInitGame = () => {
    this.props.onInitGame()
    this.handleOnChangeCard()
  }

  handleOnChangeCard = () => {
    if ( this.props.cardList.length !== 0 ) {
      const { card, cardList } = this.generateRandomCard()
    
      this.props.onDrawCard( card, cardList )
    } else {
      this.openNotification( 'warning', 'Ya no hay cartas', 'Se han acabado todas las cartas para cantar, verifique a un ganador para terminar el juego' )
    }
    
  }

  generateRandomCard = () => {
    //TODO: REPLACE WITH RANDOM FUNCTION LATELY
    const randomNumber = Math.floor(Math.random() * (this.props.cardList.length )) + 0; 
    const randomCard = this.props.cardList[randomNumber]
    const cardsUpdated = this.props.cardList.filter( ( element, index ) => index !== randomNumber  )
    
    return { card: randomCard, cardList: cardsUpdated }
  }

  getWatingGameSection = () => {
    const gameInfo = (
      <Aux>
        <h2 className="gameControl__sub-header">Próxima partida:</h2>

        <section className="gameControl__wating-section">
          <div className="gameControl__info">
            <div>
              <p><b>Nombre de partida:</b> {this.props.game ? this.props.game.gameName : ''}</p>
              <p><b>ID de partida:</b> {this.props.game ? this.props.game.id : ''}</p>
              <p><b>Partida #:</b> {this.props.game ? this.props.game.index : ''}</p>
            </div>
        
            <div>
              <p><b>Premio Linea:</b> $189.00</p>
              <p><b>Premio Loteria:</b> $852.00</p>
              <p><b>Jackpot Linea:</b> $3,764.00</p>
            </div>
          </div>

          <Button 
            className="gameControl__button--init" 
            icon="play-circle" 
            type="primary" 
            size="large"
            onClick={ this.handleOnInitGame}  
          >
            Iniciar Partida
          </Button>
        </section>
      </Aux>
    ) 
    
    const section = this.props.game ? gameInfo : ( <h2 className="gameControl__sub-header">No se ha encontrado un siguientes juego, verifique que el juego existe o favor de crear uno.</h2> )
    
    return (
      <Aux>
        <Skeleton 
          loading={this.props.loading} 
          active
        >
          { section }
        </Skeleton>
      </Aux>
    )
    
  }

  getPlayingGameSection = () => {
    const cardImage = this.props.card ? this.props.card.image : 'Nuevas Figuras_1.png'
    const currentHref = window.location.href.split('dashboard')[0]

    return(
      <div>
        <Search 
          placeholder="Ingrese el folio del carton a validar"
          enterButton="Validar"
          size="large"
          onSearch={value => this.validateFolio(value)}
        />

        <Row>
          <Col className="gameControl__game-info" span={12}>
            <h3 className="gameControl__game-name">#83 - Doble Linea</h3>
            <p><span>ID:</span> 15319</p>
            <p><span>Premio Linea:</span> $189</p>
            <p><span>Prmeio Loteria:</span> $852</p>
            <p><span>Jackpot Line:</span> $3,800</p>
          </Col>

          <Col className="gameControl__game-info" span={12}>
            <h3 className="gameControl__turn-label">
              Turno: <span>{this.props.turn}</span>
            </h3>

            <div className="gameControl__card-section">
              <p>Carta actual:</p>
              <Card 
                img={`/static/assets/${cardImage}`}
                width="30%"
                height="50%"
              />
            </div>            

            <Button 
              onClick={ this.handleOnChangeCard }
              type="primary"
              size="large"
              icon="redo"
            >
              Sacar carta
            </Button>

            <a href={`${currentHref}game`} style={ { marginLeft: 20 } } target="_blanc">Ver Juego de Bingo</a>
          </Col>
        </Row>
        
         
      </div>
      
    )
  }

  openNotification = ( type, title, message ) => {
    notification[type]({
      message: title,
      description: message,
    })
  }

  validateFolio = ( folio ) => {

    if ( folio === '1234' ) {
      this.anounceWinner()
    } else {
      this.openNotification( 'error', 'Folio no ganador', 'El folio ingresado no ha ganado la partida.' )
    }

  }

  anounceWinner = () => {
    this.openNotification( 'success', '!Alguien ha ganado¡', 'El folio ingresado corresponde al folio ganador' )
    this.props.onAnounceWinner()
  }

  render() {
    const section = this.props.isGameStart ? this.getPlayingGameSection() : this.getWatingGameSection()    

    return(
      <Aux>
        {section}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isGameStart: state.dsh.isGameStart,
    turn: state.dsh.turn,
    game: state.bng.currentGame,
    loading: state.bng.loading,
    card: state.bng.currentCard,
    cardList: state.bng.cardsList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartGame: () => dispatch( startGame() ),
    onEndGame: () => dispatch( endGame() ),
    onInitGame: () => dispatch( initGame() ),
    onDrawCard: ( card, cardList ) => dispatch( drawCard( card, cardList ) ),
    onAnounceWinner: () => dispatch( anounceWinner() ),
    onLoadGame: () => dispatch( loadCurrentGame() ),
    onChangeCard: ( card, cardList ) => dispatch( changeCard( card, cardList ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(GameControl)

