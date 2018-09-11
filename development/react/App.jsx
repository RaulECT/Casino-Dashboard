import React, {Component} from 'react'
import { HashRouter, Route } from 'react-router-dom'

import BingoGame from './containers/BingoGame'
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard'

class App extends Component {
  render() {
    return(
      <HashRouter>
        <div>
          <Route exact path="/" component={BingoGame} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/login" component={Login} />
        </div>
      </HashRouter>
    )
  }
}

module.exports = App