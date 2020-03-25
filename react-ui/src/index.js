import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import websocket from './websocket'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

websocket.onmessage = (event) => {
  const message = JSON.parse(event.data)
  console.log(message)
}
