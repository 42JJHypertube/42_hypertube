import { RefObject, useEffect } from 'react'

type UseIntersectionObser = {
  target: RefObject<HTMLDivElement>
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number
  onIntersect: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => void
}

const UseIntersectionObserve = ({
  target,
  root = null,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
}: UseIntersectionObser) => {
  useEffect(() => {
    if (!target.current) return
    const io = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    })
    io.observe(target.current)

    // return () => { io.disconnect() }
  }, [onIntersect, root, target])
}

export default UseIntersectionObserve
