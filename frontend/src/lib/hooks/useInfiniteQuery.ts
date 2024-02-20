'use client'

import { useState } from 'react'

type InfiniteQeuryParam = {
  key: string
  fetchNextPage: (page: number) => void
}

function useInfiniteQuery({ key, fetchNextPage }: InfiniteQeuryParam) {
  const [data, setData] = useState<Record<string, string> | null>(null)
  const [offset, setOffset] = useState<number>(1)
  const [isfetching, setIsfetching] = useState<boolean>(false)
  const [error, setError] = useState<Record<string, string> | null>(null)
  const [status, setStatus] = useState<number | null>(null)
  const [lastPage, setLastPage] = useState<number | null>(null)

  const handleNextPage = async () => {
    if (isfetching) return
    setIsfetching(true)
    const ret = await fetchNextPage(offset)
    console.log(ret)
    setIsfetching(false)
  }

  console.log(key)
  setData(null)
  setOffset(1)
  setStatus(1)
  console.log(lastPage)
  setError(null)
  setLastPage(1)

  return { data, offset, error, status, fetchNextPage: handleNextPage }
}

export default useInfiniteQuery
