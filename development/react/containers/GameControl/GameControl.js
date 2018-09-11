import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startGame, endGame } from '../../store/actions/actions'

import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:3000')

import {
  Button
} from 'antd'
import Aux from '../../components/Aux'


class GameControl extends Component {


  getWatingGameSection = () => {
    return(
      <Button>Iniciar Juego</Button>
    )
  }

  getPlayingGameSection = () => {
    return(
      <Button>Sacar carta</Button>
    )
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

