import WebSocket from 'ws'

class WebSocketClient {
  private static instance: WebSocketClient
  private clients: Map<string, WebSocket>

  private constructor() {
    this.clients = new Map()
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient()
    }
    return WebSocketClient.instance
  }

  public connect(url: string): WebSocket {
    if (this.clients.has(url)) {
      return this.clients.get(url)!
    }

    const ws = new WebSocket(url)

    ws.on('open', () => {
      console.log(`Connected to ${url}`)
    })

    ws.on('error', (err) => {
      console.error(`WebSocket error: ${err}`)
    })

    ws.on('close', () => {
      console.log(`Connection to ${url} closed`)
      this.clients.delete(url)
    })

    ws.on('message', (data) => {
      console.log(`Received from ${url}: ${data}`)
    })

    this.clients.set(url, ws)
    return ws
  }

  public send(url: string, message: string): void {
    const ws = this.clients.get(url)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message)
      console.log(`Sent to ${url}: ${message}`)
    } else {
      console.error(`WebSocket is not open for ${url}`)
    }
  }

  public close(url: string): void {
    const ws = this.clients.get(url)
    if (ws) {
      ws.close()
      this.clients.delete(url)
      console.log(`Closed connection to ${url}`)
    }
  }
}

const wsClient = WebSocketClient.getInstance()
export default wsClient
