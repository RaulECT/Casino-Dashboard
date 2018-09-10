import React, {Component} from 'react'

import BingoGame from './containers/BingoGame'

class App extends Component {
  render() {
    return(
      <div>
        <BingoGame />
      </div>
    )
  }
}

module.exports = App