'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PageIndicator from '../pageIndicator'
import SlideContent from '../slideContent/slideContent'
import useSlider from '@/lib/hooks/useSlider'
import styles from './index.module.scss'

type Props = {
  contentData: any
  ContentComponent: JSX.ElementType
  getKeyAndProps: (data: any) => { key: any; props: any }
  getViewCount: () => number
}

function Slide({
  contentData,
  getKeyAndProps,
  getViewCount,
  ContentComponent,
}: Props) {
  const [animate, setAnimate] = useState<boolean>(false)
  const { slideData, index, viewCount, setNewSlideData, setIndex } = useSlider({
    getViewCount,
    data: contentData,
  })
  const slideRef = useRef<HTMLDivElement>(null)
 
  const handleClick = (dir: 'next' | 'prev', slideRef: any) => {
    if (animate) return

    setAnimate(true)
    slideRef.current.classList.add(
      dir === 'prev' ? styles.moveLeft : styles.moveRight,
    )

    setTimeout(() => {
      setAnimate(false)
      let nextIdx =
        index + viewCount >= contentData.length ? 0 : index + viewCount
      setIndex(nextIdx)
      setNewSlideData(nextIdx, viewCount)
      slideRef.current.classList.remove(
        dir === 'prev' ? styles.moveLeft : styles.moveRight,
      )
    }, 1000)
  }

  const pageCount = Math.ceil(contentData.length / viewCount)
  const pageIdx = Math.floor(index / viewCount)

  return (
    <div className={styles.slide}>
      {/* <PageIndicator pageCount={pageCount} pageIdx={pageIdx} /> */}
      <button className={styles.buttonLeft} onClick={() => handleClick('prev', slideRef)}>
        {'<'}
      </button>
      <div className={styles.contentContainer} ref={slideRef}>
        <SlideContent
          slideData={slideData}
          getKeyAndProps={getKeyAndProps}
          ContentComponent={ContentComponent}
        />
      </div>
      <button className={styles.buttonRight} onClick={() => handleClick('next', slideRef)}>
        {'>'}
      </button>
    </div>
  )
}

export default Slide
