import { updateUserPicture, setUserName } from './actions'

const rootUrl = window.location.href.indexOf('localhost') !== -1 ? 'ws://localhost:5005' : window.location.href.replace(/^http/, 'ws')
console.log({ rootUrl })
let activeWebsocket

export function sendMessage(event) {
  if (activeWebsocket && activeWebsocket.readyState === activeWebsocket.OPEN) {
    try {
      console.debug('Sending message', event)
      activeWebsocket.send(JSON.stringify(event))
      return
    } catch(err) {
      console.error('Send failed, retrying later', err)
    }
  }
  console.log('Queueing message', event)
  setTimeout(() => sendMessage(event), 1000)
}

export const websocketUrl = (id, user) =>
  `${rootUrl}?id=${id || '' }`

export function connectWebsocket(store) {
  console.log('Connecting to websocket...')
  const { users, uuid } = store.getState()
  const user = users[uuid]

  const ws = new WebSocket(websocketUrl(uuid, user))
  activeWebsocket = ws

  if (user && user.image) {
    store.dispatch(updateUserPicture(users[uuid].image))
  }
  if (user && user.name) {
    store.dispatch(setUserName(user.name))
  }

  ws.onmessage = (event) => {
    console.debug('Received message', event)
    store.dispatch(JSON.parse(event.data))
  }

  ws.onclose = (e) => {
    console.log('Socket closed', e.reason)
    activeWebsocket = null
    setTimeout(() => connectWebsocket(store), 1000)
  }

  ws.onerror = (err) => {
    console.error('Socket failure, closing socket', err)
    ws.close()
  }
}
