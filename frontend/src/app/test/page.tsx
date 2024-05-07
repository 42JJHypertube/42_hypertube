'use client'

import React, { Ref, useEffect, useRef, useState } from 'react'
import Hls from 'hls.js' // Hls.js 라이브러리 import
import { FaPlay, FaRegStopCircle } from 'react-icons/fa' // 실행, 일시정지
import {
  MdSubtitles,
  MdFullscreen,
  MdFullscreenExit,
  MdSettings,
} from 'react-icons/md' // 화질 설정, 자막설정, 전체화면, 전체화면 탈출
import { AiFillSound } from 'react-icons/ai' // 사운드 설정 버튼

import styles from './index.module.scss'

export default function TestPage() {
  const videoRef = useRef(null)
  const outSideRef = useRef<HTMLDivElement>(null)
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
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log('video and hls.js are now bound together !')
      })
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log(
          'manifest loaded, found ' + data.levels.length + ' quality level',
        )
        console.log(data)
      })
      hls.loadSource(
        'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      )

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
      }
    } else if (videoElement?.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src =
        'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    } else {
      console.error('Your browser does not support HLS streaming.')
    }
  }, [])

  return (
    <div>
      <p>Test Page</p>
      <div className={styles.videoContainer} ref={outSideRef}>
        <video
          className={styles.videoPlayer}
          ref={videoRef}
          id="video-player"
          height="300"
          width="400"
        >
          Your browser does not support the video tag.
        </video>
        {showController && (
          <div className={styles.videoController}>
            <div className={styles.leftController}>
              <button className={styles.buttons}>
                <FaPlay />
              </button>
              <button className={styles.buttons}>
                <AiFillSound />
              </button>
            </div>
            <div className={styles.rightController}>
              <button className={styles.buttons}>
                <MdSubtitles />
              </button>
              <button className={styles.buttons}>
                <MdSettings />
              </button>
              <button className={styles.buttons}>
                <MdFullscreen />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
