const { pick } = require('lodash')
const generateRandomName = require('./randomNames')

class PictureServer {
  constructor(connector) {
    this.connector = connector
    this.state = {}
  }

  handleMessage = (id, event) => {
    this[event.type](id, event)
  }

  login = (id) => {
    this.updateState(id, {
      id,
      name: generateRandomName(),
      image: null,
      ...this.state[id],
      active: true,
    })
    this.connector.notifyAllUsers('setState', this.state)
  }

  logout = (id) => {
    this.updateState(id, { active: false })
    this.connector.notifyAllUsers('setState', this.state)
  }

  updatePicture = (id, event) => {
    this.updateState(id, { image: event.image })
    this.connector.notifyAllUsers('updateState', pick(this.state, id))
  }

  updateName = (id, event) => {
    this.updateState(id, { name: event.name })
    this.connector.notifyAllUsers('updateState', pick(this.state, id))
  }

  updateState = (id, update) => {
    this.state[id] = {
      ...this.state[id],
      ...update,
      lastUpdate: Date.now(),
    }
  }
}

class Connector {
  constructor(websocketServer) {
    this.websocketServer = websocketServer
  }

  notifyAllUsers = (type, payload) => {
    this.websocketServer.clients.forEach((client) => {
      this.sendMessage(client, { type, payload })
    })
  }

  sendMessage = (client, event) => {
    client.send(JSON.stringify(event))
  }
}

module.exports = { PictureServer, Connector }
