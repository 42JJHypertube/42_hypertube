//   {
//     action: ('join' | 'detach'),
//     torrentHash: (토렌트 해시코드)
//   }

class WebSocketClient {
  private clients: WebSocket | null
  private hashFun: Map<string, any>

  public constructor() {
    this.clients = null
    this.hashFun = new Map<string, any>() // <torrentHash, action>
  }

  public init() {
    if (this.clients) {
      console.warn('WebSocket is already initialized.')
      return
    }

    this.clients = new WebSocket(
      'wss://localhost/socket/movies/download/progress',
    )
    this.clients.onopen = () => {
      console.log('WebSocket connected successfully')
    }

    // 소켓이 닫혔을 때 처리
    this.clients.onclose = () => {
      console.log('WebSocket connection closed')
      this.clients = null
    }

    // 소켓에서 오류가 발생했을 때 처리
    this.clients.onerror = (error) => {
      console.error('WebSocket connection error:', error)
    }

    this.clients.onmessage = (event: MessageEvent) => {
      console.log('Received message:', event.data)
      // 여기서 수신된 메시지에 대한 추가적인 처리를 수행할 수 있습니다.
    }
  }

  public connect(transactionId: string, torrentHash: string) {
    const message = JSON.stringify({
      transactionId,
      action: 'JOIN',
      torrentHash,
    })
    // { transactionId: `UUID-123`, action: 'join', torrentHash: torrentHash }
    // await //해당 트랜젝션 아이디로 응답이 올때까지
    // 응답 받아서 다음 진행
    // 만약 join에 실패했을경우 상황에 따라서 다음동작 결정
    if (this.clients?.readyState === 1) this.clients?.send(message)
  }

  public close(torrentHash: string): void {
    const message = JSON.stringify({
      action: 'DETACH',
      torrentHash: torrentHash,
    })
    this.hashFun.delete(torrentHash)
    this.clients?.send(message)
    if (this.hashFun.size == 0) {
      this.clients?.close()
    }
  }

  public getSocket() {
    return this.clients
  }

  public setMessage(key: string, action: any) {
    // 새로운 key 와 action 추가
    this.hashFun.set(key, action)

    // 새로운 key 와 action 이 추가된 이벤트 등록
    if (this.clients) {
      this.clients.onmessage = null
      this.clients.onmessage = (event: MessageEvent) => {
        this.hashFun.forEach((value, key) => {
          value(key, event)
        })
      }
    }
  }
}

const wsClient = new WebSocketClient()
export default wsClient
