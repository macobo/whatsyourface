const generateRandomAnimalName = require('random-animal-name-generator')

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
      name: generateRandomAnimalName(),
      image: null,
      ...this.state[id],
      active: true,
    })
    this.connector.updateAllUsers(this.state)
  }

  logout = (id) => {
    this.updateState(id, { active: false })
    this.connector.updateAllUsers(this.state)
  }

  updatePicture = (id, event) => {
    this.updateState(id, { image: event.image })
    this.connector.updateAllUsers(this.state)
  }

  updateName = (id, event) => {
    this.updateState(id, { name: event.name })
    this.connector.updateAllUsers(this.state)
  }

  updateState = (id, update) => {
    this.state[id] = {
      ...this.state[id],
      ...update,
    }
  }
}

class Connector {
  constructor(websocketServer) {
    this.websocketServer = websocketServer
  }

  updateAllUsers = (state) => {
    this.websocketServer.clients.forEach((client) => {
      this.sendMessage(client, { type: 'updateState', payload: state })
    })
  }

  sendMessage = (client, event) => {
    client.send(JSON.stringify(event))
  }
}

module.exports = { PictureServer, Connector }
