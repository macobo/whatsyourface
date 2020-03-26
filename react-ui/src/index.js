import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import persistState from 'redux-localstorage'
import * as reducers from './reducer'
import { connectWebsocket } from './websocket'
import App from './App'

import './index.css'

const store = configureStore({
  reducer: reducers,
  enhancers: [persistState()],
})

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)

connectWebsocket(store)
