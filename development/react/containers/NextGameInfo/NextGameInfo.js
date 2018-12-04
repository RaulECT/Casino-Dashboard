import React, {Component} from 'react'

class NextGameInfo extends Component {
  render() {
    const style = {
      flex: this.props.flex ? this.props.flex : '0',
      background: this.props.opacity ? `rgba(0,0,0,${this.props.opacity})` : `rgba(0,0,0,0)`
    }

    return(
      <div style={style}>
        NextGameInfo...
      </div>
    )
  }
}

export default NextGameInfo

