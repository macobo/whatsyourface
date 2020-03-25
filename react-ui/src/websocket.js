const ws = new WebSocket('ws://localhost:5005')

export function sendMessage(event) {
  ws.send(JSON.stringify(event))
}

export default ws
