'use client'

import { MovieData } from '../movieRecommendSection'
import MovieCard from '@/modules/common/components/movieCard'
import styles from './index.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import useThrottle from '@/lib/hooks/useThrottle'

type Props = {
  movieData: MovieData[]
}
type Dir = 'left' | 'right'

export default function MovieRecommendList({ movieData }: Props) {
  const [moveCount, setMoveCount] = useState<number>(4)
  const [idx, setIdx] = useState(0)
  console.log(moveCount)

  const makeSlideData = useCallback(
    (idx: number) => {
      const newSlideData = []
      for (let i = -moveCount; i < 2 * moveCount; ++i) {
        const index = (idx + i + movieData.length) % movieData.length
        newSlideData.push(movieData[index])
      }
      return newSlideData
    },
    [movieData, moveCount],
  )

  const [slideData, setSlideData] = useState<MovieData[]>(() =>
    makeSlideData(0),
  )

  const ulRef = useRef<HTMLDivElement>(null)

  const changeCount = useCallback(() => {
    const width = window.innerWidth
    const count = Math.floor(width / 180)
    if (count != moveCount) setMoveCount(count)
  }, [movieData, moveCount])

  const removeAnimation = useCallback(
    ({ dir, data, idx }: { dir: Dir; data: MovieData[]; idx: number }) => {
      if (!ulRef?.current) return
      const dIdx = dir === 'left' ? -moveCount : moveCount
      const newidx = (idx + data.length + dIdx) % data.length
      setSlideData(makeSlideData(newidx))
      setIdx(newidx)
      ulRef.current.classList.remove(dir === 'left' ? styles.moveLeft : styles.moveRight)
    },
    [movieData, makeSlideData, moveCount],
  )
  const { throttleFunc: animate } = useThrottle(1000, removeAnimation)

  const handleClick = useCallback(
    ({ dir, data, idx }: { dir: Dir; data: MovieData[]; idx: number }) => {
        if (!ulRef?.current) return
        ulRef.current.classList.add(dir === 'left' ? styles.moveLeft : styles.moveRight)
        animate({ dir, data, idx })
    },
    [movieData, moveCount],
  )

  useEffect(() => {
    window.addEventListener('resize', changeCount)

    return () => {
      window.removeEventListener('resize', changeCount)
    }
  })

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
          {slideData.map((e: MovieData) => {
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
