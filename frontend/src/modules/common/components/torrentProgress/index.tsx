'use client'

import { useEffect, useState } from 'react'
import wsClient from '@/lib/socket/socket'
import TorrentLoadingSpinner from '../spinner/torrentLoading'
import styles from './index.module.scss'

function TorrentProgress({ hash, test }: { hash: string; test: boolean }) {
  const [progressPer, setProgress] = useState<number>(0)
  const [curSocket, setCursocket] = useState<WebSocket | any>(null)

  function updateProgress(hash: string, event: MessageEvent) {
    try {
      const res = JSON.parse(event.data)
      console.log(res)
      const { imdbId, torrentHash, progress, status } = res
      if (hash === torrentHash) {
        if (progress != progressPer) setProgress(progress)
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

  return (
    <div className={styles.container}>
      <TorrentLoadingSpinner per={progressPer} />
      {progressPer}%
      <div>
        <button
          onClick={() => {
            if (curSocket?.OPEN) {
              wsClient.connect('asdfasdf', test ? 'TEST' : hash)
              wsClient.setMessage(test ? 'TEST' : hash, updateProgress)
            }
          }}
        >
          connect
        </button>
      </div>
    </div>
  )
}

export default TorrentProgress
