import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

const ws = new WebSocket('ws://localhost:5005')

ws.onmessage = (event) => {
  console.log(event)
}
