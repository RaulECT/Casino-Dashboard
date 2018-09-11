import React, {Component} from 'react'
import { HashRouter, Route } from 'react-router-dom'

import BingoGame from './containers/BingoGame'
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard'
import WinnerSection from './containers/WinnerSection/WinnerSection'

class App extends Component {
  render() {
    return(
      <HashRouter>
        <div>
          <Route exact path="/" component={BingoGame} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/login" component={Login} />
          <Route exact path="/winner" component={WinnerSection} />
        </div>
      </HashRouter>
    )
  }
}

module.exports = App