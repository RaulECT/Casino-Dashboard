import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openConnection } from '../../../socket'
import { loadCurrentGame } from '../../store/actions'

import Background from '../../components/Background/Background'
import NextGameInfo from '../NextGameInfo/NextGameInfo'
import RandomGame from '../RandomGame/RandomGame'

class WaitingGameSection extends Component {

  componentDidMount() {
    this.socket = openConnection()
    this.props.onLoadGame( ( path ) => console.log(path) )

    this.socket.on( 'START_GAME', ( game ) => {
      this.props.history.push( '/game' )
    } )
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    return(
      <Background display="flexRow" >
        <NextGameInfo 
          flex="1.8"
          opacity={.15}
          game={ this.props.game }
        />
        
        <RandomGame 
          flex="1"
        />
      </Background>
    )
  }
}

const mapStateToProps = state => {
  return {
    game: state.bng.currentGame
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadGame: ( push ) => dispatch( loadCurrentGame( push ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(WaitingGameSection)