import React, {Component} from 'react'
import { HashRouter, Route } from 'react-router-dom'
import fs from 'fs'

import Login from './pages/Login.jsx'
import GeneralConfigurations from './pages/GeneralConfigurations.jsx'
import RolesManagment from './pages/RolesManagment.jsx'
import PromotionsManagment from './pages/PromotionsManagment.jsx'
import ClientsManagment from './pages/ClientsManagment.jsx'
import Records from './pages/Records.jsx'
import Stadistics from './pages/Statistics.jsx'
import UsersManagment from './pages/UsersManagment.jsx'
import AppConfiguration from './pages/AppConfiguration.jsx'

class App extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      configExists: true
    }

    this.confirmConfigurationFile = this.confirmConfigurationFile.bind( this )
  }

  confirmConfigurationFile() {
    this.setState( {configExists: true} )
  }

  componentWillMount() {
    fs.readFile( 'config.txt', 'utf8', ( err, data ) => {

      if ( err ) {
        this.setState( { configExists: false } )

      } else {
        this.setState( { configExists: true } )

      }
    } )
  }

  getDashboardRoutes() {
    return(
      <HashRouter>
        <div>
          <Route exact path="/" component = {Login} />
          <Route exact path = "/dashboard/configuraciones_generales" component = {GeneralConfigurations} />
          <Route exact path="/dashboard/gestion_roles" component = {RolesManagment} />
          <Route exact path="/dashboard/promociones" component = {PromotionsManagment} />
          <Route exact path="/dashboard/clientes" component = {ClientsManagment} />
          <Route exact path="/dashboard/historial" component = {Records} />
          <Route exact path="/dashboard/estadisticas" component = {Stadistics} />
          <Route exact path="/dashboard/administracion_usuarios" component={UsersManagment}/>
        </div>
      </HashRouter>
    )
  }

  getConfigComponent() {
    return(
      <AppConfiguration
        onConfirm={ this.confirmConfigurationFile }
      />
    )
  }

  render() {
    const { configExists } = this.state
    const section = configExists ? this.getDashboardRoutes() : this.getConfigComponent()

    return( section )

    /*return(
      <HashRouter>
        <div>
          <Route exact path="/" component = {Login} />
          <Route exact path = "/dashboard/configuraciones_generales" component = {GeneralConfigurations} />
          <Route exact path="/dashboard/gestion_roles" component = {RolesManagment} />
          <Route exact path="/dashboard/promociones" component = {PromotionsManagment} />
          <Route exact path="/dashboard/clientes" component = {ClientsManagment} />
          <Route exact path="/dashboard/historial" component = {Records} />
          <Route exact path="/dashboard/estadisticas" component = {Stadistics} />
          <Route exact path="/dashboard/administracion_usuarios" component={UsersManagment}/>
        </div>
      </HashRouter>
    )*/
    
  }
}

module.exports = App