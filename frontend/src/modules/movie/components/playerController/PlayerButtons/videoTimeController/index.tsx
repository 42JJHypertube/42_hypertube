'use client'

import { useCallback, useEffect, useRef } from 'react'

type Props = { videoRef: any }

export default function VideoTimeController({ videoRef }: Props) {
  const seekbarRef = useRef<HTMLInputElement>(null);
  
  const videoTimeController = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTime = parseFloat(e.target.value);
    if (videoRef) {
      videoRef.currentTime = currentTime;
    }
  }, [videoRef]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef && seekbarRef.current) {
        seekbarRef.current.value = videoRef.currentTime.toString();
      }
    };

    if (videoRef) {
      videoRef.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoRef) {
        videoRef.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [videoRef]);

  return (
    <input
      ref={seekbarRef}
      type="range"
      id="seekbar"
      min="0"
      max={videoRef?.duration ? videoRef.duration : 0}
      step="0.1"
      onChange={videoTimeController}
    />
  );
}
