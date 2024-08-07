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

const url =
  'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
// const url =  'https://10.18.229.2/movies/tt2113625/master.m3u8'

export default function TestPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const outSideRef = useRef<HTMLDivElement>(null)
  const [showController, setShowController] = useState<boolean>(false)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  let hideControllerTimeout: NodeJS.Timeout // 컨트롤러 숨김을 위한 타이머

  const showVideoController = () => {
    clearTimeout(hideControllerTimeout) // 기존 타이머 취소
    setShowController(true) // 컨트롤러 표시

    // 일정 시간 후에 컨트롤러를 숨기는 타이머 설정
    hideControllerTimeout = setTimeout(() => {
      setShowController(false)
    }, 3000) // 3초 후 컨트롤러 숨김
  }

  const handleEscape = () => {
    if (!document.fullscreenElement) {
      setIsFullScreen(false)
    }
  }

  const toggleFullScreen = () => {
    const videoElement = videoRef.current?.parentNode as HTMLDivElement
    if (!isFullScreen) {
      if (videoElement) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen() // 전체화면 모드 활성화
          // } else if (videoElement.webkitRequestFullscreen) {
          //   videoElement.webkitRequestFullscreen(); // 웹킷 브라우저 호환성
          // } else if (videoElement.mozRequestFullScreen) {
          //   videoElement.mozRequestFullScreen(); // 파이어폭스 호환성
          // } else if (videoElement.msRequestFullscreen) {
          //   videoElement.msRequestFullscreen(); // IE/Edge 호환성
          // }
        }
        setIsFullScreen(true)
      }
    } else {
      document
        .exitFullscreen()
        .then(() => console.log('exit full screen'))
        .catch(() => console.log('error occured'))
      setIsFullScreen(false)
    }
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
      document.addEventListener('fullscreenchange', handleEscape)

      return () => {
        videoElement.removeEventListener('mousemove', showVideoController)
        outSideRef?.current?.removeEventListener('mouseenter', () => {
          clearTimeout(hideControllerTimeout)
          setShowController(false)
        })
        hls.destroy()
      }
    } else if (videoElement?.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = url
    } else {
      console.error('Your browser does not support HLS streaming.')
    }
  }, [])

  return (
    <div>
      <p>Test Page</p>
      <div
        className={
          isFullScreen
            ? `${styles.videoContainer}  ${styles.fullScreen}`
            : `${styles.videoContainer}`
        }
        ref={outSideRef}
      >
        <video className={styles.videoPlayer} ref={videoRef} id="video-player">
          Your browser does not support the video tag.
        </video>
        {showController && (
          <div className={styles.videoController}>
            <div className={styles.leftController}>
              <button
                className={styles.buttons}
                onClick={
                  isPlay
                    ? () => {
                        setIsPlay(false)
                        videoRef.current?.pause()
                      }
                    : () => {
                        setIsPlay(true)
                        videoRef.current?.play()
                      }
                }
              >
                {isPlay ? <FaRegStopCircle /> : <FaPlay />}
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
              <button className={styles.buttons} onClick={toggleFullScreen}>
                <MdFullscreen />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
