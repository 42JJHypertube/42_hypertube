import { useCallback, useEffect, useState } from 'react'
import useThrottle from './useThrottle'

type Props = {
  data: any
  getViewCount: () => number
}

const makeSlideData = (data: any, viewCount: number, curIndex: number) => {
  const newSlideData = []
  for (let i = -viewCount; i < 2 * viewCount; ++i) {
    const index = (curIndex + i + data.length) % data.length
    newSlideData.push(data[index])
  }
  return newSlideData
}

const useSlider = ({ data, getViewCount }: Props) => {
  const [index, setIndex] = useState<number>(0)
  const [viewCount, setViewCount] = useState<number>(4)
  const [slideData, setSlideData] = useState(() =>
    makeSlideData(data, viewCount, index),
  )

  const resizeViewCount = useCallback(() => {
    const newViewCount = getViewCount()
    if (newViewCount === viewCount) return
    setViewCount(newViewCount)
    setNewSlideData(index, newViewCount)
  }, [getViewCount, viewCount, index])

  const setNewSlideData = useCallback(
    (index: number, viewCount: number) => {
      const newSlidedata = makeSlideData(data, viewCount, index)
      setSlideData(newSlidedata)
    },
    [data],
  )

  const { throttleFunc: handleResize } = useThrottle(200, resizeViewCount)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return { slideData, index, viewCount, setNewSlideData, setIndex }
}

export default useSlider
