'use client'

import MovieCard from '@/modules/main/components/movieCard'
import { useEffect, useRef, useState } from 'react'
import UseIntersectionObserve from '@/lib/hooks/useIntersectionObserve'
import { actionWrapper, getMovie } from '@/lib/data'
import styles from './main.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MovieSection({initData, total_pages} : {initData: any, total_pages: number}) {
  const last = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Record<string, any>[]>(initData)
  const [isFetching, setIsfetching] = useState<boolean>(false)
  const [inView, setInview] = useState<boolean>(false)
  const [pages, setPages] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(total_pages)

  async function loadMovies() {
    setIsfetching(true)
    const next = pages + 1
    if (next <= lastPage) {
      const ret = await actionWrapper({ action: getMovie, param: next })
      if (ret?.response.status === 200) {
        setData([...data, ...ret.data.results])
        setPages(next)
        setLastPage(ret.data.total_pages)
      }
    }
    setIsfetching(false)
  }

  useEffect(() => {
    if (inView && !isFetching) {
      loadMovies()
    }
  }, [inView, isFetching])

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInview(true)
      } else setInview(false)
    })
  }

  UseIntersectionObserve({ target: last, threshold: 1.0, onIntersect })

  return (
    <div className={styles.main}>
      <h3>Most Popular Movies</h3>
      <div className={styles.InfiniteContainer}>
        <div className={styles.mainMovieCardContainer}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {Object.values(data).map((info: any) => (
            <MovieCard
              key={info.id as number}
              title={info.title as string}
              imgUrl={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
            />
          ))}
          {isFetching ? (
            <div className={styles.last}> loading .... </div>
          ) : (
            <div ref={last} className={styles.last}>
              Last Page
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
