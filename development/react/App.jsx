import React, {Component} from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'

class App extends Component {
  render() {
    return(
      <HashRouter>
        <Route exact path="/" component = {Login} />
      </HashRouter>
    )
  }
}

module.exports = App