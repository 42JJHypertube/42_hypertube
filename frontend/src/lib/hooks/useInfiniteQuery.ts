'use client'

import { useState } from 'react'

type InfiniteQeuryParam = {
  key: string
  fetchNextPage: (page: number) => Promise<any>
}

/**
 *
 * @param param0
 * key : Cache를 위한 key
 * fetchNextPage : (key, page) page번호와 검색을위한 key를 받아서 다음 페이지를 받아오는 함수
 * @returns
 */
function useInfiniteQuery({ fetchNextPage }: InfiniteQeuryParam) {
  const [data, setData] = useState<any | null>(null)
  const [offset, setOffset] = useState<number>(1)
  const [isfetching, setIsfetching] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)

  const handleNextPage = async () => {
    if (isfetching) return
    setIsfetching(true)
    const ret = await fetchNextPage(offset)
    if (ret?.response.status === 200) {
      setData(ret)
      setOffset((prevOffset) => prevOffset + 1)
      setIsError(false)
      setIsfetching(false)

      if (ret.data.page === ret.data.total_pages) setHasNextPage(false)
      return
    }

    setIsError(true)
    setData(ret)
    setIsfetching(false)
  }

  return {
    data,
    offset,
    isError,
    isfetching,
    hasNextPage,
    fetchNextPage: handleNextPage,
  }
}

export default useInfiniteQuery
