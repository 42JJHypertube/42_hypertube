'use client'

import { MovieData } from '../movieRecommendSection'
import MovieCard from '@/modules/common/components/movieCard'
import styles from './index.module.scss'
import { useCallback, useRef, useState } from 'react'
import useThrottle from '@/lib/hooks/useThrottle'

type Props = {
  movieData: MovieData[]
}

export default function MovieRecommendList({ movieData }: Props) {
  const makeSlideData =  useCallback((idx: number) => {
    const newSlideData = []
    if (movieData.length < 4) {
      return movieData
    }
    for (let i = -4; i < 8; ++i){
      const index = (idx + i + movieData.length) % movieData.length;
      newSlideData.push(movieData[index])
    }
    return newSlideData;
  },[movieData])

  const removeAnimation = useCallback(( { dir, data, idx } : { dir:boolean, data: MovieData[], idx: number }) => {
    // left
    if (dir == false) {
      if (!ulRef?.current) return ;
      const newidx = (idx + data.length - 4) % data.length
      setSlideData(makeSlideData(newidx))
      setIdx(newidx);
      ulRef.current.classList.remove(styles.moveLeft)
    }
    if (dir == true) {
      if (!ulRef?.current) return ;
      const newidx = (idx + data.length + 4) % data.length 
      setSlideData(makeSlideData(newidx))
      setIdx(newidx)
      ulRef.current.classList.remove(styles.moveRight)  
    }
  }, [movieData])

  const handleClick = useCallback(({ dir, data, idx } : { dir:boolean, data: MovieData[], idx: number }) => {
    // left
    if (dir == false) {
      if (!ulRef?.current) return;
      ulRef.current.classList.add(styles.moveLeft)
      animate({dir, data, idx});
    }
    if (dir == true) {
      if (!ulRef?.current) return
      ulRef.current.classList.add(styles.moveRight)
      animate({dir, data, idx})  
    }
  }, [movieData])
  
  const [moveCount, setMoveCount] = useState<number>(5);
  const [idx, setIdx] = useState(0);
  const [slideData, setSlideData] = useState<MovieData[]>(() => makeSlideData(0))
  const ulRef = useRef<HTMLDivElement>(null)
  const { throttleFunc: animate } = useThrottle(1000, removeAnimation)

  return (
    <div className={styles.slider}>
       <button className={styles.buttonLeft} onClick={() => {handleClick({dir: false, data: movieData, idx:idx})}}> <b>{'<'}</b></button>
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
      <button className={styles.buttonRight} onClick={() => {handleClick({dir: true, data: movieData, idx:idx})}}> {'>'} </button>
    </div>
  )
}
