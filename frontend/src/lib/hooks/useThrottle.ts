import { useState, useCallback } from 'react'

const useThrottle = (ms: number, callback?: any) => {
  const [isWorking, setIsWorking] = useState<boolean>(false)
  const [nextArg, setNextArg] = useState<any>(null)

  const throttleFunc = useCallback((arg: any) => {
    if (isWorking) {
      setNextArg(arg)
      return
    }

    setIsWorking(true)
    callback(arg)

    setTimeout(() => {
      setIsWorking(false)
      if (nextArg) {
        callback(nextArg)
        setNextArg(null)
      }
    }, ms)
  }, [ms, callback])

  return { throttleFunc }
}

export default useThrottle
