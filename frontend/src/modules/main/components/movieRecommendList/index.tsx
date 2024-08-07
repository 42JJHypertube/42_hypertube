'use client'

import { MovieData } from '../movieRecommendSection'
import MovieCard from '@/modules/common/components/movieCard'
import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

type Props = {
  movieData: MovieData[]
}

export default function MovieRecommendList({ movieData }: Props) {
  const selectedRef = useRef<HTMLLIElement>(null);
  const [index, setIndex] = useState(() => 0);

  const handleLeftClick = () => {
    flushSync(() => {
      if (0 < index) {
        setIndex(index - 1);
      } else {
        setIndex(movieData.length - 1);
      }
    });
    selectedRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });   
  };

  const handleRightClick = () => {
    flushSync(() => {
      if (index < movieData.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }); 
    selectedRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });   
  };

  return (
    <>
      <button onClick={handleLeftClick}>left</button>
      <ul className={styles.ul}>
        {movieData.map((e: MovieData, idx: number) => {
          return (
            <li key={e.id} ref={idx === index ? selectedRef : null } className={idx == index ? `${styles.item} ${styles.focus}` : `${styles.item}`}>
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
      <button onClick={handleRightClick}>right</button>
    </>
  )
}
