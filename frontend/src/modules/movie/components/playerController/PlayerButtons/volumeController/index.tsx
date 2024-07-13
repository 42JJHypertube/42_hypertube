'use client'

import { useCallback, useState } from 'react'

type Props = { videoRef: any }

export default function VolumeController({ videoRef }: Props) {
  // 나중에 localStorage 에서 기본설정 받아오는걸로.
  const [volume, setVolume] = useState<number>(50)

  const volumeController = useCallback(
    (e: any) => {
      if (videoRef) {
        setVolume(e.target.value)
        videoRef.volume = e.target.value / 100
      }
    },
    [videoRef],
  )

  if (!videoRef) return null

  return (
    <input
      type="range"
      id="seekbar"
      min="0"
      max="100"
      value={volume}
      step="1"
      onChange={volumeController}
    />
  )
}
