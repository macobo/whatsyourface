let activeWebsocket

export function sendMessage(event) {
  if (activeWebsocket) {
    console.debug('Sending message', event)
    activeWebsocket.send(JSON.stringify(event))
  } else {
    console.log('No active websocket, queueing message', event)
    setTimeout(() => sendMessage(event), 300)
  }
}

export function connectWebsocket(store) {
  console.log('Opening websocket')
  const ws = new WebSocket('ws://localhost:5005')
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
