import React,{ Component } from 'react'
import moment from 'moment'
import { openConnection } from '../../../socket'

import './Chronometer.css'

class Chronometer extends Component {

  state = {
    time: this.props.timeStart
  }

  componentDidMount() {
    switch ( this.props.type ) {
      case 'global':
        this.handleOnGlobalConfiguration()
        break;

      case 'local':
        this.handleOnLocalConfiguration()
        break

      default:
        this.handleOnLocalConfiguration()
        break;
    }
    
  }

  componentWillUnmount() {
    switch ( this.props.type ) {
      case 'global':
        this.socket.close()
        break;

      case 'local':
        clearInterval( this.interval )
        break
    
      default:
        clearInterval( this.interval )
        break;
    }
   
  }

  handleOnGlobalConfiguration = () => {
    this.socket = openConnection()

    this.socket.on( 'COUNTDOWN_CONNECTED', data => {
      console.log( data )
      let time = data.time >= 0 ? data.time : 0

      this.setState( { time } )
    } )

    this.socket.on( 'UPDATE_COUNTDOWN', data => {
      console.log( data )
      const isNotEndTime = this.state.time > 0

      if ( isNotEndTime ) {
        this.setState( { time: data.time } )
      } else {
        this.socket.emit( 'STOP_COUNTDOWN' )

        this.props.onEndTime()
      }
    } )
  }

  handleOnLocalConfiguration = () => {
    this.interval = setInterval( () => this.tick(), 1000 )
  }

  tick = () => {
 
    if ( this.state.time > 0 ) {
      this.setState( prevState => ( {
        time: prevState.time - 1
      } ) )
    } else {
      clearInterval( this.interval )

      this.props.onEndTime()
    }
  }

  render() {
    const { time } = this.state
    const minutes = moment( (time * 1000) ).format( 'mm:ss' )
   
    return(
      <p className="chronometer__time">{ minutes }</p>
    )
  }
}

export default Chronometer