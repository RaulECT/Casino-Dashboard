import React, {Component} from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Aux from './components/Aux'
import BingoGame from './containers/BingoGame'
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard'
import WinnerSection from './containers/WinnerSection/WinnerSection'
import { authCheckState } from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onCheckAuth()
  }

  render() {
    let routes = (
      <HashRouter>
        <div>
          <Route exact path="/game" component={BingoGame} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/winner" component={WinnerSection} />
          <Redirect to="/login" />
        </div>
      </HashRouter>
    )

    if ( this.props.isAuthenticated ) {
      routes = (
        <HashRouter>
        <div>
          <Route exact path="/game" component={BingoGame} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/winner" component={WinnerSection} />
          <Redirect to="/dashboard/game_control" />
        </div>
      </HashRouter>
      )
    } 

    return(
      <Aux>
        {routes}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch( authCheckState() )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(App)