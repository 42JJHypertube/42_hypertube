import newSocket from '../newSocket/newSocket'

class Broker {
  event: EventTarget
  listener: Map<string, EventListener[]>

  constructor() {
    this.event = new EventTarget()
    this.listener = new Map()
  }

  subscribe(key: string, callback: EventListener): boolean {
    // 이미 구독중인 상태라면
    if (this.listener.has(key)) {
      this.listener.get(key)?.push(callback)
      return true
    }
    // Socket에 새로운 key 연결 요청
    if (!newSocket.connect(key)) return false
    // 새로운 key 추가
    this.listener.set(key, [callback])
    return true
  }

  unsubscribe(key: string, callback: EventListener) {
    const callbacks = this.listener.get(key)
    if (callbacks) {
      const nextCallbacks = callbacks.filter((f) => f !== callback)
      if (nextCallbacks.length != 0) {
        this.listener.set(key, nextCallbacks)
        return
      }
      this.listener.delete(key)
      this.event.dispatchEvent(
        new CustomEvent('deleteChannel', { detail: key }),
      )
    }
  }
}

export default Broker
