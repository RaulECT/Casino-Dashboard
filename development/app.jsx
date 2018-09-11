import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './react/App.jsx'
import bingoReducer from './react/store/reducers/bingoGame'
require( 'antd/dist/antd.css' )

const rootReducer = combineReducers( {
  bng: bingoReducer
} )

const store = createStore( rootReducer )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById( 'root' )
)