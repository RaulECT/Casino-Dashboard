import React, {Component} from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CSSTransition from 'react-transition-group/CSSTransition'

import Aux from './components/Aux'
import BingoGame from './containers/BingoGame'
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard'
import WinnerSection from './containers/WinnerSection/WinnerSection'
import CardsSection from './containers/CardsSection/CardsSection'
import { authCheckState } from './store/actions/index'

import Test from './containers/Test'

import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.onCheckAuth()
  }

  render() {
    let routes = []

    if ( this.props.isAuthenticated ) {
      routes = [
        <Route key="test_screen" exact path="/Test" component={Test} />,
        <Route key="dashboard_screen" path="/dashboard" component={Dashboard} />,
        <Route key="main_screen" exact path="/" component={Dashboard} />,
      ]
    } else {
      routes = [
        <Route key="login_screen" exact path="/login" component={Login} />,
        <Route key="main_screen" exact path="/" component={Login} />
      ]
    }

    return(
      <Aux>
        <CSSTransition
          in={this.props.isAuthenticated}
          timeout={300}
          classNames="page"
        >
          <HashRouter>
            <div>
              <Route key="game_screen" exact path="/game" component={BingoGame} />
              <Route key="winner_screen" exact path="/winner" component={WinnerSection} />
              <Route key="cards_screen" exact path="/history" component={CardsSection} />
              {routes}
            </div>
          </HashRouter>
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