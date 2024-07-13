'use client'

import VideoTimeController from './PlayerButtons/videoTimeController'
import PlayerButton from './PlayerButtons'
import VolumeController from './PlayerButtons/volumeController'
import QualitySelector from './PlayerButtons/qualitySelector'
import { memo, useCallback } from 'react'
import styles from './index.module.scss'

type Props = { videoRef: any; hlsRef: any, outSideRef: any}

// 버그 : 풀스크린상태에서 esc로 취소했을시 버튼의 디자인이 변경되지않음.
function PlayerController({ videoRef, hlsRef, outSideRef }: Props) {
  const volumeAction = useCallback(
    (b: boolean) => {
      if (videoRef) {
        if (b) videoRef.muted = true
        else videoRef.muted = false
      }
    },
    [videoRef],
  )

  const playAction = useCallback(
    (b: boolean) => {
      if (videoRef) {
        if (b) videoRef.play()
        else videoRef.pause()
      }
    },
    [videoRef],
  )

  const fullScreenAction = useCallback(
    (b: boolean) => {
      const videoElement = outSideRef
      if (b) {
        if (videoElement) {
          if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen()
          }
        }
      } else {
        document
          .exitFullscreen()
          .then(() => console.log('exit full screen'))
          .catch(() => console.log('error occured'))
      }
    },
    [outSideRef],
  )

  return (
    <div className={styles.container}>
      <VideoTimeController videoRef={videoRef} />
      <div className={styles.videoController}>
        <div className={styles.leftController}>
          <PlayerButton type="play" action={playAction} />
          <PlayerButton
            type="volume"
            action={volumeAction}
            rightContent={<VolumeController videoRef={videoRef} />}
          />
        </div>
        <div className={styles.rightController}>
          <PlayerButton type="subtitle" />
          <PlayerButton
            type="quality"
            upperContent={<QualitySelector hlsRef={hlsRef} />}
          />
          <PlayerButton type="fullScreen" action={fullScreenAction} />
        </div>
      </div>
    </div>
  )
}

const MemoizedPlayerController = memo(PlayerController)
export default MemoizedPlayerController