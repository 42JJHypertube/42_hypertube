'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Hls from 'hls.js' // Hls.js 라이브러리 import
import PlayerController from '../playerController'
import styles from './index.module.scss'

const url =
  'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
// const url =  'https://10.18.229.2/movies/tt2113625/master.m3u8'

export default function HLSplayer({
  hlsPlaylistPath,
}: {
  hlsPlaylistPath: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const outSideRef = useRef<HTMLDivElement>(null)
  const hlsRef = useRef<any>(null)

  const [showController, setShowController] = useState<boolean>(false)
  let hideControllerTimeout: NodeJS.Timeout // 컨트롤러 숨김을 위한 타이머

  const showVideoController = () => {
    clearTimeout(hideControllerTimeout) // 기존 타이머 취소
    setShowController(true) // 컨트롤러 표시

    // 일정 시간 후에 컨트롤러를 숨기는 타이머 설정
    hideControllerTimeout = setTimeout(() => {
      setShowController(false)
    }, 3000) // 3초 후 컨트롤러 숨김
  }

  useEffect(() => {
    const videoElement = document.getElementById(
      'video-player',
    ) as HTMLVideoElement

    if (Hls.isSupported()) {
      const hls = new Hls()
      hlsRef.current = hls
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log('video and hls.js are now bound together !')
      })
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log(
          'manifest loaded, found ' + data.levels.length + ' quality level',
          data.levels.forEach((lv) => {
            console.log(lv)
          }),
        )
        console.log(data)
      })
      hls.loadSource(url)

      if (videoElement) {
        videoElement.addEventListener('mousemove', showVideoController)
        hls.attachMedia(videoElement)
      }
      if (outSideRef) {
        outSideRef.current?.addEventListener('mouseenter', () => {
          clearTimeout(hideControllerTimeout)
          setShowController(false)
        })
      }

      return () => {
        videoElement.removeEventListener('mousemove', showVideoController)
        outSideRef?.current?.removeEventListener('mouseenter', () => {
          clearTimeout(hideControllerTimeout)
          setShowController(false)
        })
        hls.destroy()
        hlsRef.current = null
      }
    } else if (videoElement?.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = url
    } else {
      console.error('Your browser does not support HLS streaming.')
    }
  }, [])

  return (
    <div className={styles.videoContainer} ref={outSideRef}>
      <video className={styles.videoPlayer} ref={videoRef} id="video-player">
        Your browser does not support the video tag.
        <track src="/subtitle.vtt" kind="subtitles" label="English" default />
      </video>
      <div className={showController ? `${styles.controllerOn}` : `${styles.controllerOff}`} >
        <PlayerController hlsRef={hlsRef.current} videoRef={videoRef.current} outSideRef={outSideRef.current}/>
      </div>
    </div>
  )
}
