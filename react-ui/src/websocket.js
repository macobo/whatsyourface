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

export const websocketUrl = (store) => {
  const id = store.getState().uuid || ''
  const user = store.getState().users[id]
  return `${rootUrl}?id=${id}${user && user.name ? `&name=${user.name}` : ''}`
}

export function connectWebsocket(store) {
  const ws = new WebSocket(websocketUrl(store))
  activeWebsocket = ws

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
