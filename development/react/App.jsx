import React, {Component} from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CSSTransition from 'react-transition-group/CSSTransition'

import Aux from './components/Aux'
import BingoGame from './containers/BingoGame'
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard'
import WinnerSection from './containers/WinnerSection/WinnerSection'
import { authCheckState } from './store/actions/index'
import './App.css'

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
          <Route exact path="/" component={Login} />
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
          <Route exact path="/" component={Dashboard} />
        </div>
      </HashRouter>
      )
    } 

    return(
      <Aux>
        <CSSTransition
          in={this.props.isAuthenticated}
          timeout={300}
          classNames="page"
        >
          {routes}
        </CSSTransition>
        
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