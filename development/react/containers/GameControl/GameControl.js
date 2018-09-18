import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startGame, endGame, initGame, drawCard, anounceWinner } from '../../store/actions/index'

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
      <Button onClick={ this.props.onInitGame }>Iniciar Juego</Button>
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
    /*socket.emit( 'USER_WON_RQ' )
    this.props.onEndGame()*/ 
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
    isGameStart: state.dsh.isGameStart
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

