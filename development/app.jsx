import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './react/App.jsx'
import bingoReducer from './react/store/reducers/bingoGame'
import dashboardReducer from './react/store/reducers/gameManagment'
require( 'antd/dist/antd.css' )

const rootReducer = combineReducers( {
  bng: bingoReducer,
  dsh: dashboardReducer
} )

const store = createStore( rootReducer, applyMiddleware( thunk ) )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById( 'root' )
)