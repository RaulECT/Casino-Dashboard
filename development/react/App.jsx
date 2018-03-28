import React, {Component} from 'react'
import { HashRouter, Route } from 'react-router-dom'
import RolesManagment from './pages/RolesManagment.jsx'

class App extends Component {
  render() {
    return(
      <HashRouter>
        <div>
          <Route exact path="/dashboard/gestion_roles" component = {RolesManagment} />
        </div>
      </HashRouter>
    )
  }
}

module.exports = App