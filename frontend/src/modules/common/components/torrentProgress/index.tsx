'use client'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
// import wsClient from '@/lib/socket/socket'
import TorrentLoadingSpinner from '../spinner/torrentLoading'
import styles from './index.module.scss'
// import useSocket from '@/lib/hooks/useSocket'
import newSocket from '@/lib/newSocket/newSocket'

function TorrentProgress({
  hash,
  setMovieState,
}: {
  hash: string
  setMovieState: Dispatch<SetStateAction<string>>
}) {
  const [progressPer, setProgress] = useState<number>(0)
  const [curState, setCurState] = useState<string>('')
  const [tryCount, setTryCount] = useState<number>(0)
  const broker = newSocket.movieBroker

  const updateProgress = useCallback((e: Event) => {
    const event = e as CustomEvent
    const data = JSON.parse(event.detail)
    console.log(typeof data)
    const { imdbId, torrentHash, progress, status } = data
    console.log(torrentHash)
    if (hash === torrentHash) {
      if (progress != progressPer) setProgress(progress)
      if (curState != status) {
        setCurState(status)
        setMovieState(status)
      }
    }
  }
  , [hash])

  const tryConnect = () => {
    if (!newSocket.clients) newSocket.init()
    if (newSocket.clients?.readyState === 1) {
      let success = newSocket.connect(hash)
      if (success) {
        broker.subscribe(hash, updateProgress)
        return ;
      }
    }
    setTimeout(() => {
      if (tryCount > 3) return ;
      tryConnect();
      setTryCount((prev) => prev + 1)
    }, 1000)
  }

  useEffect(() => {
    tryConnect();
    return () => {
      newSocket.movieBroker.unsubscribe(hash, updateProgress)
    }
  }, [hash])


  // useEffect(() => {
  //   console.log('setSocket')
  //   console.log(readyState)
  //   if (readyState === WebSocket.OPEN) {
  //     console.log('openSocket')
  //     wsClient.connect('asdfasdf', hash)
  //     wsClient.setMessage(hash, updateProgress)
  //   }
  // }, [readyState])

  return (
    <div className={styles.container}>
      <TorrentLoadingSpinner per={progressPer} />
      {progressPer}%<div> {curState}... </div>
    </div>
  )
}

export default TorrentProgress
