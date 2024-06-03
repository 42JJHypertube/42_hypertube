'use client'

import { useEffect, useState } from 'react'
import wsClient from '@/lib/socket/socket'

async function initWebSocket() {
  await wsClient.init()
  return wsClient.getSocket()
}

function TorrentProgress({ imdb_id }: { imdb_id: string }) {
  const [progressPer, setProgress] = useState<number | null>(0)

  function updateProgress(imdb_id: string, event: MessageEvent) {
    try {
      const res = JSON.parse(event.data)
      const { imdbId, torrentHash, progress, status } = res
      if (progress != progressPer) setProgress(progress)
    } catch (error) {
      console.error('Failed to parse message data as JSON:', error)
    }
  }

  useEffect(() => {
    async function fetchData(imdb_id: string) {
      const curSocket = await initWebSocket()

      if (curSocket) {
        wsClient.connect(imdb_id)
        wsClient.setMessage(imdb_id, updateProgress)
      }
    }

    fetchData(imdb_id)

    return () => {}
  }, [])
  return <div>{progressPer}%</div>
}

export default TorrentProgress
