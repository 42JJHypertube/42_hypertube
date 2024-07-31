class Socket  {
  clients: WebSocket | null
  movieBroker: MovieBroker

  constructor() {
    this.clients = null
    this.movieBroker = new MovieBroker()
  }
  getMovieBroker(): MovieBroker { return this.movieBroker }
  init() {
    if (this.clients) return
    this.clients = new WebSocket(
      'wss://localhost/socket/movies/download/progress',
    )
    const deleteChannel = (e: Event) =>  {
      const event = e as CustomEvent
      this.disconnect(event.detail.key)
    }
    // 열렸을 때 처리
    // 해당 이벤트를 받고 connect를 호출하도록 유도.
    this.clients.onopen = () => {
      this.movieBroker.publish('open', '');
    }

    // 소켓이 닫혔을 때 처리
    this.clients.onclose = () => {
      this.movieBroker.publish('close', '')
      this.movieBroker.event.removeEventListener('delete', deleteChannel)
      this.clients = null
    }

    // 소켓에서 오류가 발생했을 때 처리
    this.clients.onerror = (error) => {
      this.movieBroker.publish('error', '')
    }

    this.clients.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      this.movieBroker.publish(data.torrentHash as string, event.data)
    }

    this.movieBroker.event.addEventListener('delete', deleteChannel)
  }

  /**
   * 특정 torrentHash 에 대한 다운로드 정보를 요청.
   * @param transactionId - 연결에 필요한 unique Id (필요없을 듯?)
   * @param torrentHash - 연결을 원하는 torrentHash
   * @returns boolean - 서버에 요청을 성공했을 때 true / 실패시 false
   */
  connect(torrentHash: string): boolean {
    // 현재 socket이 죽어있는 상태면, 새로 소켓을 init.
    if (!this.clients) { this.init(); return false; }
    
    // 서버에 요청을 보낼 양식.
    const message = JSON.stringify({
      transactionId: '',
      action: 'JOIN',
      torrentHash,
    })

    // 소켓이 open 상태일때만 보냄.
    if (this.clients.readyState === 1) { this.clients.send(message); return true }
    return false;
  }

  disconnect(torrentHash: string) {
    if (!this.clients) return;
    const message = JSON.stringify({
      action: 'DETACH',
      torrentHash: torrentHash,
    })
    this.clients.send(message)
  }
}

class Broker{
  event: EventTarget
  listener: Map<string, EventListener[]>
  
  constructor() {
    this.event = new EventTarget()
    this.listener = new Map()
  }

  subscribe(key : string, callback: EventListener) {
    this.event.addEventListener(key, callback)
    if (this.listener.has(key)) {
      this.listener.get(key)?.push(callback);
      return ;
    }
    this.listener.set(key, [callback]);
  }

  unsubscribe(key: string, callback: EventListener) {
    console.log("구독 취소")
    const callbacks = this.listener.get(key)
    if (callbacks) {
      const nextCallbacks = callbacks.filter((f) => f !== callback)
      if (nextCallbacks.length != 0) { this.listener.set(key, nextCallbacks); return; } 
      this.listener.delete(key);
      this.event.dispatchEvent(new CustomEvent('deleteChannel', { detail: key }))
    }
  }
}

class MovieBroker extends Broker {
  publish(key: string, data: string) {
    console.log(key, data)
    this.event.dispatchEvent(new CustomEvent(key, { detail: data }))
  }
}

const newSocket = new Socket()
const movieBroker = newSocket.movieBroker
export default newSocket
export { movieBroker };
export { newSocket }
