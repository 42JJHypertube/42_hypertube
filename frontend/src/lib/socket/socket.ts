import WebSocket from 'ws'

class WebSocketClient {
  private static instance: WebSocketClient
  private clients: WebSocket

  private constructor(url: string) {
    this.clients = new WebSocket(url)
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient("ws://localhost/socket/movies/download/progress")
    }
    return WebSocketClient.instance
  }

  //   {
  //     action: ('join' | 'detach'),
  //     torrentHash: (토렌트 해시코드)
  //   }

  public connect(torrentHash: string) {
    const message = JSON.stringify({ action: 'join', torrentHash: torrentHash });
    this.clients.send(message)
  }

  public close(torrentHash: string): void {
    const message = JSON.stringify({ action: 'detach', torrentHash: torrentHash});
    this.clients.send(message)
    this.clients.close()
  }

  public getClients(): WebSocket {
    return this.clients;
  }
}

const wsClient = WebSocketClient.getInstance()
export default wsClient
