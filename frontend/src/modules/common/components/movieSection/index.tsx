'use client'

import { useEffect, useRef, useState } from 'react'
import UseIntersectionObserve from '@/lib/hooks/useIntersectionObserve'
import { actionWrapper } from '@/lib/data'
import styles from './movieSection.module.scss'
import MovieCard from '../movieCard'
import MovieSectionLoading from './loading'

type LoadParams = {
  pages?: number
} & Record<string, any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MovieSection({
  initData,
  total_pages,
  loadFunction,
  loadParams,
}: {
  initData: any
  total_pages: number
  loadFunction: any
  loadParams: LoadParams
}) {
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
    const newParam = {
      ...loadParams,
      pages: next,
    }
    if (next <= lastPage) {
      const ret = await actionWrapper({ action: loadFunction, param: newParam })
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
    <div>
      <div className={styles.InfiniteContainer}>
        <div className={styles.mainMovieCardContainer}>
          {data.map((info: any) => (
            <MovieCard
              key={info.id as number}
              title={info.title as string}
              movie_id={info.id as number}
              imgUrl={info.poster_path}
            />
          ))}
          {isFetching ? (
            <div className={styles.last}>
              <MovieSectionLoading />
            </div>
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
