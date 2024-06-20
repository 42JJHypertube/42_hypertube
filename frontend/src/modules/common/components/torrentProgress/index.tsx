'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import wsClient from '@/lib/socket/socket'
import TorrentLoadingSpinner from '../spinner/torrentLoading'
import styles from './index.module.scss'
import useSocket from '@/lib/hooks/useSocket'

function TorrentProgress({
  hash,
  setMovieState,
}: {
  hash: string
  setMovieState: Dispatch<SetStateAction<string>>
}) {
  const [progressPer, setProgress] = useState<number>(0)
  const [curState, setCurState] = useState<string>('')
  const { socket, readyState } = useSocket()

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
    console.log('setSocket')
    console.log(readyState)
    if (readyState === WebSocket.OPEN) {
      console.log('openSocket')
      wsClient.connect('asdfasdf', hash)
      wsClient.setMessage(hash, updateProgress)
    }
  }, [readyState])

  return (
    <div className={styles.container}>
      <TorrentLoadingSpinner per={progressPer} />
      {progressPer}%<div> {curState}... </div>
    </div>
  )
}

export default TorrentProgress
