const express = require('express')
const { Server } = require('ws')
const path = require('path')
const uuid = require('uuid')
const { PictureServer, Connector } = require('./pictureServer')

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
const connector = new Connector(websockets)
const pictureServer = new PictureServer(connector)

websockets.on('connection', (ws) => {
  ws.id = uuid.v4()
  pictureServer.login(ws.id)

  ws.send(JSON.stringify({ type: 'uuid', payload: ws.id }))

  console.log('Client connected', ws.id)
  ws.on('message', (message) => {
    pictureServer.handleMessage(ws.id, JSON.parse(message))
  })

  ws.on('close', () => {
    console.log('Client disconnected', ws.id)
    pictureServer.logout(ws.id)
  })
})

