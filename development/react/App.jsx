import React, {Component} from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import GeneralConfigurations from './pages/GeneralConfigurations.jsx'

import RolesManagment from './pages/RolesManagment.jsx'

class App extends Component {
  render() {
    return(
      <HashRouter>
        <div>
          <Route exact path="/" component = {Login} />
          <Route exact path = "/dashboard/configuraciones_generales" component = {GeneralConfigurations} />
          <Route exact path="/dashboard/gestion_roles" component = {RolesManagment} />
        </div>
      </HashRouter>
    )
  }
}

module.exports = App