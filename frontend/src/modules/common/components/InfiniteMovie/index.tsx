'use client'

import { useRef } from 'react'
import UseIntersectionObserve from '@/lib/hooks/useIntersectionObserve'
import { getMovie } from '@/lib/data'

async function fetchNextPage(page: number) {
  const data = await getMovie({ pages: page })
  console.log(data)
}

function InfiniteMovie() {
  const bottomRef = useRef<HTMLDivElement>(null) // current component

  const onIntersect = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach((entry) => entry.isIntersecting && fetchNextPage(1))
    console.log(observer)
  }

  UseIntersectionObserve({ target: bottomRef, threshold: 1.0, onIntersect })
  return <div ref={bottomRef}> bottom </div>
}

export default InfiniteMovie
