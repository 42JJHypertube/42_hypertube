'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TorrentProgress from '../torrentProgress'
import styles from './index.module.scss'
import {
  actionWrapper,
  getMovieInfo,
  getTorrentData,
  postTorrentDownload,
} from '@/lib/data'
import getSortedTorrent from '@/lib/utill/getSortedTorrent'
import { TorrentInfo } from '@/lib/utill/getSortedTorrent'
import HLSplayer from '@/modules/movie/components/HLSPlayer'

type MovieState = 'NOFILE' | 'DOWNLOADING' | 'CONVERTING' | 'AVAILABLE'

async function clickPlay(
  movieState: string,
  torrentHash: string | undefined,
  imdb_id: any,
  setPlay: Dispatch<SetStateAction<boolean>>,
  setCurState: Dispatch<SetStateAction<string>>,
) {
  const magnetUrl = `magnet:?xt=urn:btih:${torrentHash}&dn=The+Shawshank+Redemption+%281994%29+%5B1080p%5D+%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce`

  if (torrentHash) {
    const movieStatus = await actionWrapper({
      action: postTorrentDownload,
      param: { imdb_id, magnetUrl },
    })
    console.log('MovieStatus : ', movieStatus)
    if (movieStatus.response.status === 201) {
      setCurState(movieStatus.data.movieState)
      if (
        movieStatus.data.movieState === 'DOWNLOADING' ||
        movieStatus.data.movieState === 'CONVERTING'
      ) {
      }
      setPlay(true)
    }
  }
}

function VideoPlayer({ imdb_id }: { imdb_id: number }) {
  const [play, setPlay] = useState<boolean>(false)
  const [movieState, setMovieState] = useState<string>('')
  const [hash, setHash] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function fetchData() {
      const torrentData = await actionWrapper({
        action: getTorrentData,
        param: { imdb_id },
      })
      console.log("torrentData: ", torrentData.data)
      if (torrentData.response.status === 200) {
        const torrent = getSortedTorrent({
          torrents: torrentData.data?.data?.movie?.torrents,
        })
        if (torrent) setHash(torrent.hash)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      {hash ? 
      (<>
      {!play && (
        <button
          onClick={() => {
            clickPlay(movieState, hash, imdb_id, setPlay, setMovieState)
          }}
        >
          Play
        </button>
      )}
      {play &&
        (movieState === 'DOWNLOADING' || movieState === 'CONVERTING' ? (
          <TorrentProgress hash={hash!} setMovieState={setMovieState} />
        ) : movieState === 'AVAILABLE' ? (
          <div> <HLSplayer hlsPlaylistPath={'tt0063350/master.m3u8'}/> </div>
        ) : null)}
      </>) : (<div> No Torrent Data </div>)
    }
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
