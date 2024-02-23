'use client'

import MovieCard from '@/modules/main/components/movieCard'
import styles from './main.module.scss'
import { useEffect, useRef, useState } from 'react'
import UseIntersectionObserve from '@/lib/hooks/useIntersectionObserve'
import { getMovie } from '@/lib/data'

export default function MovieSection(initData: any) {
  const last = useRef(null)
  const [data, setData] = useState<Record<string, any>[]>(initData.data)
  const [isFetching, setIsfetching] = useState<Boolean>(false)
  const [inView, setInview] = useState<Boolean>(false)
  const [pages, setPages] = useState<number>(1)

  async function loadMovies() {
    console.log('loadMovies')
    setIsfetching(true)
    const next = pages + 1;
    const ret = await getMovie(next).then((res) => res).catch((error) => {console.log(error)})
    
    if (ret?.response.status === 200){
      setData([...data, ...(ret.data.results)])
      setPages(pages + 1)
    }
  }

  useEffect(() => {
    if (inView && !isFetching) {
        loadMovies()
        setIsfetching(false)
    }
  }, [inView, isFetching])

  const onIntersect = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInview(true)
      } else
      setInview(false)
    })
  }

  UseIntersectionObserve({ target: last, threshold: 1.0, onIntersect })

  return (
    <div className={styles.main}>
      <h3>Most Popular Movies</h3>
      <div className={styles.InfiniteContainer}>
        <div className={styles.mainMovieCardContainer}>
          {data.map((info: any) => (
            <MovieCard
              key={info.id as number}
              title={info.title as string}
              imgUrl={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
            />
          ))}
          {(isFetching) ? (
            <div className={styles.last}> loading .... </div>
          ) : (
            <div ref={last} className={styles.last}>
              HElllllllllllllllllllllllllll
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
