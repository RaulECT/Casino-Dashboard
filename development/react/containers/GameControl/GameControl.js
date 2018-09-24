import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startGame, endGame, initGame, drawCard, anounceWinner, loadCurrentGame } from '../../store/actions/index'

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

  getWatingGameSection = () => {
    return(
      <Aux>
        <Skeleton 
          loading={this.props.loading} 
          active
        >
          <h2 className="gameControl__sub-header">Próxima partida:</h2>

          <section className="gameControl__wating-section">
            <div className="gameControl__info">
              <div>
                <p><b>Nombre de partida:</b> DOBLE LINEA</p>
                <p><b>ID de partida:</b> 15319</p>
                <p><b>Partida #:</b> 32</p>
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
              onClick={this.props.onInitGame}  
            >
              Iniciar Partida
            </Button>
          </section>
        </Skeleton>
      </Aux>
    )
  }

  getPlayingGameSection = () => {
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
              Turno: <span>1</span>
            </h3>

            <div className="gameControl__card-section">
              <p>Carta actual:</p>
              <Card 
                img="/static/assets/Nuevas Figuras_1.png"
                width="30%"
                height="50%"
              />
            </div>            

            <Button 
              onClick={ this.props.onDrawCard }
              type="primary"
              size="large"
              icon="redo"
            >
              Sacar carta
            </Button>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartGame: () => dispatch( startGame() ),
    onEndGame: () => dispatch( endGame() ),
    onInitGame: () => dispatch( initGame() ),
    onDrawCard: () => dispatch( drawCard() ),
    onAnounceWinner: () => dispatch( anounceWinner() ),
    onLoadGame: () => dispatch( loadCurrentGame() ),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(GameControl)

