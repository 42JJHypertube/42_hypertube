import { BrokerType } from '../broker/type'

class Socket {
  clients: WebSocket | null
  movieBroker: BrokerType | null
  // brokers: Map<String, BrokerType[]> 나중에 많은 이벤트들을 관리하게되면 고려해볼만할듯.
  // 서버에서 메세지를 보내줄 때 ResourceType, eventType, data 이런식으로 해야하지 않을까.

  constructor() {
    this.clients = null
    this.movieBroker = null
    // brokers = new Map<String, BrokerType[]>()
  }

  setBroker(broker: BrokerType) {
    this.movieBroker = broker
  }

  init() {
    if (this.clients) return
    this.clients = new WebSocket(
      'wss://localhost/socket/movies/download/progress',
    )

    // 열렸을 때 처리
    // 해당 이벤트를 받고 connect를 호출하도록 유도.
    this.clients.onopen = () => {
      this.movieBroker?.publish('open', '')
    }

    // 소켓이 닫혔을 때 처리
    this.clients.onclose = () => {
      this.movieBroker?.publish('close', '')
      this.clients = null
    }

    // 소켓에서 오류가 발생했을 때 처리
    this.clients.onerror = (error) => {
      this.movieBroker?.publish('error', '')
    }

    this.clients.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      this.movieBroker?.publish(data.torrentHash as string, event.data)
    }
  }

  /**
   * 특정 torrentHash 에 대한 다운로드 정보를 요청.
   * @param transactionId - 연결에 필요한 unique Id (으... 나중에)
   * @param torrentHash - 연결을 원하는 torrentHash
   * @returns boolean - 서버에 요청을 성공했을 때 true / 실패시 false
   */
  connect(torrentHash: string): boolean {
    const message = JSON.stringify({
      transactionId: '',
      action: 'JOIN',
      torrentHash,
    })
    return this.send(message)
  }

  disconnect(torrentHash: string): boolean {
    const message = JSON.stringify({
      action: 'DETACH',
      torrentHash: torrentHash,
    })
    return this.send(message)
  }

  send(message: string) {
    if (!this.clients) {
      this.init()
      return false
    }
    if (this.clients.readyState === WebSocket.OPEN) {
      this.clients.send(message)
      return true
    }
    return false
  }
}

const newSocket = new Socket()
export default newSocket
