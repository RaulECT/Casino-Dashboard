import React, {Component} from 'react'
import { HashRouter, Route } from 'react-router-dom'
import UsersManagment from './pages/UsersManagment.jsx'

class App extends Component {
  render() {
    return(
      <HashRouter>
        <div>
          <Route exact path="/dashboard/administracion_usuarios" component={UsersManagment}/>
        </div>
      </HashRouter>

    )
  }
}

module.exports = App