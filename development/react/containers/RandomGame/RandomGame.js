import React, {Component} from 'react'

class RandomGame extends Component {
  render() {
    const style = {
      flex: this.props.flex ? this.props.flex : '0'
    }

    return(
      <div style={style}>
        RandomGame...
      </div>
    )
  }
}

export default RandomGame