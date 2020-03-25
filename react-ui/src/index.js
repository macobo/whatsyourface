import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import * as reducers from './reducer'
import websocket from './websocket'
import App from './App'

import './index.css'

const store = configureStore({ reducer: reducers })

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)

websocket.onmessage = (event) => {
  const message = JSON.parse(event.data)
  store.dispatch(message)
}
