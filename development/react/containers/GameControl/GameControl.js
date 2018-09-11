import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startGame, endGame } from '../../store/actions/actions'

import openSocket from 'socket.io-client'
import {
  Button,
  Input,
  notification
} from 'antd'
import Aux from '../../components/Aux'

const socket = openSocket('http://localhost:3000')
const Search = Input.Search

class GameControl extends Component {


  getWatingGameSection = () => {
    return(
      <Button onClick={ this.startGame }>Iniciar Juego</Button>
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
        <Button onClick={this.drawCard}>Sacar carta</Button> 
      </div>
      
    )
  }

  startGame = () => {
    socket.emit( 'START_GAME_RQ' )
    this.props.onStartGame()
  }

  drawCard = () => { socket.emit( 'DRAW_CARD_RQ' ) }

  openNotification = ( type, title, message ) => {
    notification[type]({
      message: title,
      description: message,
    })
  }

  validateFolio = ( folio ) => {

    if ( folio === '1234' ) {
      console.log( 'FOLIO GANADOR' )
    } else {
      this.openNotification( 'error', 'Folio no ganador', 'El folio ingresado no ha ganado la partida.' )
    }

    
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
    isGameStart: state.dsh.isGameStart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartGame: () => dispatch( startGame() ),
    onEndGame: () => dispatch( endGame() )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(GameControl)

