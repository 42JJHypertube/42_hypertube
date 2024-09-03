'use client'

import { useCallback, useEffect, useState } from 'react'
import PageIndicator from '../pageIndicator'
import useSlider from '@/lib/hooks/useSlider'

type Props = {
  contentData: any
  getKey: () => any
  getViewCount: () => number
}

function Slide({ contentData, getKey, getViewCount }: Props) {
  const [animate, setAnimate] = useState<boolean>(false)
  const { slideData, index, viewCount, setNewSlideData, setIndex } = useSlider({
    getViewCount,
    data: contentData,
  })

  const handleClick = (dir: 'next' | 'prev') => {
    if (animate) return

    setAnimate(true)
    setTimeout(() => {
      if (!animate) return

      setAnimate(false)
      const nextIdx = index + viewCount >= contentData.length ? 0 : index + viewCount
      setIndex(nextIdx)
      setNewSlideData(nextIdx)
    }, 1000)
  }

  const pageCount = Math.ceil(contentData.length / viewCount)
  const pageIdx = Math.floor(index / viewCount)

  return (
    <div>
      <PageIndicator pageCount={pageCount} pageIdx={pageIdx} />
      <button onClick={() => handleClick('prev')}> {'<'} </button>
      <button onClick={() => handleClick('next')}> {'>'} </button>
    </div>
  )
}

export default Slide
