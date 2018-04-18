import React, {Component} from 'react'
import { HashRouter, Route } from 'react-router-dom'

import ClientsManagment from './pages/ClientsManagment.jsx'

class App extends Component {
  render() {
    return(
      <HashRouter>
        <div>
          <Route exact path="/dashboard/clientes" component = {ClientsManagment} />
        </div>
      </HashRouter>
    )
  }
}

module.exports = App