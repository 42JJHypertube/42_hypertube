import { useEffect, useState } from 'react'
import wsClient from '../socket/socket'

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [readyState, setReadyState] = useState<number>(3)

  const updateReadyState = () => {
    if (socket) setReadyState(socket?.readyState ?? WebSocket.CLOSED)
  }

  useEffect(() => {
    wsClient.init()
    setSocket(wsClient.getSocket())
  }, [])

  useEffect(() => {
    if (socket) {
      socket.addEventListener('open', updateReadyState)
      socket.addEventListener('close', () => {
        updateReadyState()
        setSocket(null)
      })
      socket.addEventListener('error', updateReadyState)
    }

    return () => {
      if (socket) {
        socket.removeEventListener('open', updateReadyState)
        socket.removeEventListener('close', () => {
          updateReadyState()
          setSocket(null)
        })
        socket.removeEventListener('error', updateReadyState)
      }
    }
  }, [socket])

  return { socket, readyState }
}

export default useSocket
