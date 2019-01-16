import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './react/App.jsx'
import bingoReducer from './react/store/reducers/bingoGame'
import dashboardReducer from './react/store/reducers/gameManagment'
import authReducer from './react/store/reducers/auth'
import cardboardReducer from './react/store/reducers/cardboardManagment'
import casinoReducer from './react/store/reducers/casinos'
require( 'antd/dist/antd.css' )

const rootReducer = combineReducers( {
  bng: bingoReducer,
  dsh: dashboardReducer,
  auth: authReducer,
  crd: cardboardReducer,
  cas: casinoReducer,
} )

const store = createStore( rootReducer, applyMiddleware( thunk ) )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById( 'root' )
)