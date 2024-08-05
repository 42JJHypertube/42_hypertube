'use client'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import TorrentLoadingSpinner from '../spinner/torrentLoading'
import styles from './index.module.scss'
import newSocket from '@/lib/newSocket/newSocket'
import downloadBroker from '@/lib/broker/resource/download'

function TorrentProgress({
  hash,
  setMovieState,
}: {
  hash: string
  setMovieState: Dispatch<SetStateAction<string>>
}) {
  const [progressPer, setProgress] = useState<number>(0)
  const [curState, setCurState] = useState<string>('')
  const [socketError, setSocketError] = useState<boolean>(false)
  const broker = newSocket.movieBroker

  const updateProgress = useCallback(
    (e: Event) => {
      const event = e as CustomEvent
      const data = JSON.parse(event.detail)
      const { imdbId, torrentHash, progress, status } = data
      if (hash === torrentHash) {
        if (progress != progressPer) setProgress(progress)
        if (curState != status) {
          setCurState(status)
          setMovieState(status)
        }
      }
    },
    [hash, setMovieState],
  )

  const tryConnect = useCallback((count: number) => {
    const success = downloadBroker.subscribe(hash, updateProgress)
    if (success) return
    setTimeout(() => {
      // 3회 이상 실패시, 에러 설정
      if (count > 2) {
        setSocketError(true)
        return
      }
      tryConnect(count + 1)
    }, 1000)
    return false
  }, [hash, updateProgress])

  useEffect(() => {
    tryConnect(0)

    return () => {
      downloadBroker.unsubscribe(hash, updateProgress)
    }
  }, [hash])

  return (
    <div className={styles.container}>
      <TorrentLoadingSpinner per={progressPer} />
      {progressPer}%<div> {curState}... </div>
    </div>
  )
}

export default TorrentProgress
