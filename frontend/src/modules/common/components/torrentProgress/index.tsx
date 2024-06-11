'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import wsClient from '@/lib/socket/socket'
import TorrentLoadingSpinner from '../spinner/torrentLoading'
import styles from './index.module.scss'

function TorrentProgress({
  hash,
  setMovieState,
}: {
  hash: string
  setMovieState: Dispatch<SetStateAction<string>>
}) {
  const [progressPer, setProgress] = useState<number>(0)
  const [curState, setCurState] = useState<string>('')
  const [curSocket, setCursocket] = useState<WebSocket | any>(null)

  function updateProgress(hash: string, event: MessageEvent) {
    try {
      const res = JSON.parse(event.data)
      console.log(res)
      const { imdbId, torrentHash, progress, status } = res
      if (hash === torrentHash) {
        if (progress != progressPer) setProgress(progress)
        if (curState != status) {
          setCurState(status)
          setMovieState(status)
        }
      }
    } catch (error) {
      console.error('Failed to parse message data as JSON:', error)
    }
  }

  useEffect(() => {
    async function initSocket() {
      wsClient.init()
      setCursocket(wsClient.getSocket())
    }

    initSocket()

    // 컴포넌트 해제시 소켓에서 더 이상 해당 hash에 대해서 듣지않도록 해준다.
    return () => {
      curSocket?.close()
    }
  }, [])

  useEffect(() => {
    console.log("setSocket")
    if (curSocket.readyState === WebSocket.OPEN) {
      console.log("openSocket")
      wsClient.connect('asdfasdf', hash)
      wsClient.setMessage(hash, updateProgress)
    }
  }, [curSocket])

  return (
    <div className={styles.container}>
      <TorrentLoadingSpinner per={progressPer} />
      {progressPer}%<div> {curState}... </div>
    </div>
  )
}

export default TorrentProgress
