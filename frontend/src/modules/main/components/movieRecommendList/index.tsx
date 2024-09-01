'use client'

import { MovieData } from '../movieRecommendSection'
import MovieCard from '@/modules/common/components/movieCard'
import styles from './index.module.scss'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import usePreventDup from '@/lib/hooks/usePreventDup'
import useThrottle from '@/lib/hooks/useThrottle'

type Props = {
  movieData: MovieData[]
}
type Dir = 'left' | 'right'

function makeSlideData(
  idx: number,
  displayCount: number,
  movieData: MovieData[],
) {
  const newSlideData = []
  for (let i = -displayCount; i < 2 * displayCount; ++i) {
    const index = (idx + i + movieData.length) % movieData.length
    newSlideData.push(movieData[index])
  }
  return newSlideData
}

function calcDisplayCount() {
  const width = document.documentElement.clientWidth
  if (1080 <= width) return 6
  return 4
}

export default function MovieRecommendList({ movieData }: Props) {
  const [displayCount, setDisplayCount] = useState<number>(4)
  const [idx, setIdx] = useState(0)
  const [slideData, setSlideData] = useState<MovieData[]>(() =>
    makeSlideData(0, displayCount, movieData),
  )
  const ulRef = useRef<HTMLDivElement>(null)

  const changeCount = useCallback(() => {
    const viewCount = calcDisplayCount()
    setDisplayCount(viewCount)
    setSlideData(makeSlideData(idx, viewCount, movieData))
  }, [idx])

  const removeAnimation = useCallback(({
    dir,
    data,
    idx,
  }: {
    dir: Dir
    data: MovieData[]
    idx: number
  }) => {
    if (!ulRef?.current) return
    const dIdx = dir === 'left' ? -displayCount : displayCount
    const newidx = (idx + data.length + dIdx) % data.length
    setSlideData(makeSlideData(newidx, displayCount, movieData))
    setIdx(newidx)
    ulRef.current.classList.remove(
      dir === 'left' ? styles.moveLeft : styles.moveRight,
    )
  }, [displayCount])

  const { preventFunc: animate } = usePreventDup(1000, removeAnimation)
  const { throttleFunc: handleWindowResize } = useThrottle(1000, changeCount)
  
  const handleClick = useCallback(
    ({ dir, data, idx }: { dir: Dir; data: MovieData[]; idx: number }) => {
      if (!ulRef?.current) return
      ulRef.current.classList.add(
        dir === 'left' ? styles.moveLeft : styles.moveRight,
      )
      animate({ dir, data, idx })
    },
    [animate],
  )

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])

  useLayoutEffect(() => {
    const viewCount = calcDisplayCount()
    if (viewCount == displayCount) return ;
    setDisplayCount(viewCount)
    setSlideData(makeSlideData(idx, viewCount, movieData))
  }, [displayCount, idx])

  return (
    <div className={styles.slider}>
      <button
        className={styles.buttonLeft}
        onClick={() => {
          handleClick({ dir: 'left', data: movieData, idx: idx })
        }}
      >
        <b>{'<'}</b>
      </button>
      <div className={styles.showPeek}>
        <div className={styles.ul} ref={ulRef}>
          {slideData.map((e: MovieData, idx: number) => {
            return (
              <div key={e.id} className={styles.cardContainer}>
                <MovieCard
                  title={e.title}
                  imgUrl={e.poster_path}
                  movie_id={e.id}
                />
              </div>
            )
          })}
        </div>
      </div>
      <button
        className={styles.buttonRight}
        onClick={() => {
          handleClick({ dir: 'right', data: movieData, idx: idx })
        }}
      >
        <b>{'>'}</b>
      </button>
    </div>
  )
}
