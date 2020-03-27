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

export function connectWebsocket(store) {
  const id = store.getState().uuid || ''
  const ws = new WebSocket(`ws://localhost:5005?id=${id}`)
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
