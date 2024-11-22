import { useState, useCallback } from 'react'

const useThrottle = (ms: number, callback?: any) => {
<<<<<<< Updated upstream
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
=======
  let isWorking: boolean = false
  let nextArg: any = null

  const throttleFunc = useCallback(
    (arg: any) => {
      if (isWorking) {
        nextArg = arg
        return
      }

      isWorking = true
      callback(arg)

      setTimeout(() => {
        isWorking = false
        if (nextArg) {
          throttleFunc(nextArg)
          nextArg = null
        }
      }, ms)
    },
    [ms, callback],
  )
>>>>>>> Stashed changes

  return { throttleFunc }
}

export default useThrottle
