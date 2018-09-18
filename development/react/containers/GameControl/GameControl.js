import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startGame, endGame, initGame, drawCard, anounceWinner } from '../../store/actions/index'

import './GameControl.css'
import Aux from '../../components/Aux'
import {
  Button,
  Input,
  notification
} from 'antd'


const Search = Input.Search

class GameControl extends Component {


  getWatingGameSection = () => {
    return(
      <Aux>
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
      
        <br />
        <Button onClick={ this.props.onDrawCard }>Sacar carta</Button> 
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartGame: () => dispatch( startGame() ),
    onEndGame: () => dispatch( endGame() ),
    onInitGame: () => dispatch( initGame() ),
    onDrawCard: () => dispatch( drawCard() ),
    onAnounceWinner: () => dispatch( anounceWinner() )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(GameControl)

