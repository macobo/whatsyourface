const express = require('express')
const { Server } = require('ws')
const path = require('path')

const isDev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 5005

const app = express()

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
})

const server = app.listen(PORT, function () {
  console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`)
})

const websockets = new Server({ server })

websockets.on('connection', (ws) => {
  console.log('Client connected')
  ws.on('close', () => console.log('Client disconnected'))
})

setInterval(() => {
  websockets.clients.forEach((client) => {
    client.send(new Date().toTimeString())
  })
}, 1000)
