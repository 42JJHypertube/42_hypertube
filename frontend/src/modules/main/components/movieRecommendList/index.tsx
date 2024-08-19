'use client'

import { MovieData } from '../movieRecommendSection'
import MovieCard from '@/modules/common/components/movieCard'
import styles from './index.module.scss'
import { useCallback, useRef } from 'react'
import useThrottle from '@/lib/hooks/useThrottle'

type Props = {
  movieData: MovieData[]
}

export default function MovieRecommendList({ movieData }: Props) {
  const removeAnimation = useCallback((dir: boolean) => {
    // left
    if (dir == false) {
      if (ulRef?.current)
        ulRef.current.classList.remove(styles.moveLeft)  
    }
    if (dir == true) {
      if (ulRef?.current)
        ulRef.current.classList.remove(styles.moveRight)  
    }
  }, [movieData])

  const handleClick = useCallback((dir: boolean) => {
    // left
    if (dir == false) {
      if (ulRef?.current)
        ulRef.current.classList.add(styles.moveLeft)  
    }
    if (dir == true) {
      if (ulRef?.current)
        ulRef.current.classList.add(styles.moveRight)  
    }
  }, [movieData])
  
  const ulRef = useRef<HTMLUListElement>(null)
  const { throttleFunc: animate } = useThrottle(1000, handleClick, removeAnimation)

  return (
    <div className={styles.listContainer}>
       <button className={styles.buttonLeft} onClick={() => {animate(false)}}> <b>{'<'}</b></button>
      <ul className={styles.ul} ref={ulRef}>
        {movieData.map((e: MovieData) => {
          return (
            <li key={e.id} className={styles.item}>
              <div className={styles.cardContainer}>
                <MovieCard
                  title={e.title}
                  imgUrl={e.poster_path}
                  movie_id={e.id}
                />
              </div>
            </li>
          )
        })}
      </ul>
      <button className={styles.buttonRight} onClick={() => {animate(true)}}> {'>'} </button>
    </div>
  )
}
