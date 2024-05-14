'use client'

import React, { useEffect } from 'react'
import Hls from 'hls.js' // Hls.js 라이브러리 import

export default function TestPage() {
  useEffect(() => {
    const videoElement = document.getElementById(
      'video-player',
    ) as HTMLVideoElement

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(
        'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      )
      if (videoElement) hls.attachMedia(videoElement)
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
      <video id="video-player" controls height="300" width="400">
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
