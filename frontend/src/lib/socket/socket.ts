// import WebSocket from 'ws'

  //   {
  //     action: ('join' | 'detach'),
  //     torrentHash: (토렌트 해시코드)
  //   }
  
class WebSocketClient {
  private clients: WebSocket

  public constructor(url: string) {
    this.clients = new WebSocket(url)
  }

  // public static getInstance(): WebSocketClient {
  //   if (!WebSocketClient.instance) {
  //     WebSocketClient.instance = new WebSocketClient("wss://localhost/socket/movies/download/progress")
  //   }
  //   return WebSocketClient.instance
  // }

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

const wsClient = new WebSocketClient("wss://localhost/socket/movies/download/progress")
export default wsClient
