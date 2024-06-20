'use client'

import React, { useEffect } from 'react'
import Hls from 'hls.js' // Hls.js 라이브러리 import

export default function HLSplayer({
  hlsPlaylistPath,
}: {
  hlsPlaylistPath: string
}) {
  const url = `https://localhost/movies/${hlsPlaylistPath}`
  useEffect(() => {
    const videoElement = document.getElementById(
      'video-player',
    ) as HTMLVideoElement

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(url)
      if (videoElement) hls.attachMedia(videoElement)
    } else if (videoElement?.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = url
    } else {
      console.error('Your browser does not support HLS streaming.')
    }
  }, [])

  return (
    <div>
      <p>Test Page</p>
      <video id="video-player" controls height="300" width="400">
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
