'use client'

import { useCallback, useEffect, useState } from 'react'

type Props = { videoRef: any }
export default function VideoTimeController({ videoRef }: Props) {
  const [time, setTime] = useState<number>(0)

  const videoTimeController = useCallback(
    (e: any) => {
      if (videoRef) {
        setTime(e.target.value)
        videoRef.currentTime = e.target.value
      }
    },
    [videoRef],
  )

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef) setTime(videoRef.currentTime)
    }

    if (videoRef) {
      videoRef.addEventListener('timeupdate', handleTimeUpdate)
    }

    return () => {
      if (videoRef) {
        videoRef.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [videoRef])

  return (
    <input
      type="range"
      id="seekbar"
      min="0"
      max={videoRef?.duration ? videoRef.duration : 0}
      value={time}
      step="0.1"
      onChange={videoTimeController}
    />
  )
}
