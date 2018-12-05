import React,{ Component } from 'react'
import moment from 'moment'

import './Chronometer.css'

class Chronometer extends Component {

  state = {
    time: this.props.timeStart
  }

  componentDidMount() {
    this.interval = setInterval( () => this.tick(), 1000 )
  }

  componentWillUnmount() {
    clearInterval( this.interval )
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