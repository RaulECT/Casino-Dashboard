import React, { Component, Fragment } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CSSTransition from 'react-transition-group/CSSTransition'

import './App.css'
import { authCheckState } from './store/actions/index'
import {
  Dashboard,
  Login,
  BingoGame,
  WinnerSection,
  CardsSection,
  CradboardsRegisteredList, 
  WaitingGameSection
} from './routes'

class App extends Component {

  componentDidMount() {
    this.props.onCheckAuth()
  }

  render() {
    let routes = []
    if ( this.props.isAuthenticated ) {
      routes = [
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
      <Fragment>
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
              <Route key="cardboards_screen" exact path="/cardboards" component={CradboardsRegisteredList} />
              <Route key="next_screen" exact path="/next_game" component={WaitingGameSection} />
              {routes}
            </div>
          </HashRouter>
        </CSSTransition>
        
      </Fragment>
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