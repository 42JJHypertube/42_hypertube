'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TorrentProgress from '../torrentProgress'
import styles from './index.module.scss'
import { actionWrapper, getTorrentData, postTorrentDownload } from '@/lib/data'
import getSortedTorrent from '@/lib/utill/getSortedTorrent'
import { TorrentInfo } from '@/lib/utill/getSortedTorrent'

type MovieState = 'NOFILE' | 'DOWNLOADING' | 'CONVERTING' | 'AVAILABLE'

function clickPlay(
  curState: string,
  torrentHash: string | undefined,
  imdb_id: any,
  setPlay: Dispatch<SetStateAction<boolean>>,
) {
  switch (curState) {
    // FILE이 존재하지 않기 때문에 파일 다운로드를 요청
    case 'NOFILE':
      console.log('No file available to play.')
      const magnetUrl = `magnet:?xt=urn:btih:${torrentHash}&dn=The+Shawshank+Redemption+%281994%29+%5B1080p%5D+%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce`
      postTorrentDownload({ imdb_id, magnetUrl })
      setPlay(true)
      break
    
    // 다운로드중, 컨버팅 중은 같은 의미 
    case 'DOWNLOADING':
    case 'CONVERTING':
      console.log('File is being converted.')
      setPlay(true)
      break

    // 영화를 볼 수 있는 상태
    case 'AVAILABLE':
      console.log('File is available to play.')
      setPlay(true)
      break

    // 처음에 영화 정보에대한 요청에서부터 실패한상태, 다시 요청하도록 요구됨
    default:
      throw new Error('Unknown state')
  }
}

// status에 따라서 뒤의 props들이 undefined가 될 수 있음.
function VideoPlayer({
  status,
  hlsPlaylistPath,
  movieState,
  torrentHash,
  imdb_id,
}: {
  status: number
  hlsPlaylistPath?: string
  movieState?: MovieState
  torrentHash?: string
  imdb_id: number
}) {
  const [play, setPlay] = useState<boolean>(false)
  const [curState, setCurState] = useState<string>(movieState ? movieState : '')
  const [torrentInfo, setTorrentInfo] = useState<TorrentInfo | undefined> (undefined)
  
  useEffect(() => {
    async function fetchData() {
      const torrentData = await actionWrapper({action : getTorrentData, param : {imdb_id}})
      if (torrentData.response.status === 200){
        const torrent = getSortedTorrent({torrents: torrentData.data?.data?.movie?.torrents})
        if (torrent){
          console.log(torrent)
          setTorrentInfo(torrent)
        }
        else
          console.log("토렌트가 존재하지 않습니다.")
      }
    }
    if (movieState) setCurState(movieState)
    if (movieState === "NOFILE") {
      
    }
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      {!play && (
        <button
          onClick={() => {
            clickPlay(curState, torrentHash, imdb_id, setPlay)
          }}
        >
          Play
        </button>
      )}
      {play &&
        (curState === 'DOWNLOADING' || curState === 'CONVERTING' ? (
          <TorrentProgress hash={torrentHash} test={false} />
        ) : curState === 'AVAILABLE' ? (
          <div> VideoPlayer </div>
        ) : null)}
    </div>
  )
}

export default VideoPlayer

// {torrentData.data?.data?.movie?.torrents && (
//   <TorrentList
//     imdb_id={torrentData.data.data.movie.imdb_code}
//     torrents={torrentData.data.data.movie.torrents}
//   />
// )}