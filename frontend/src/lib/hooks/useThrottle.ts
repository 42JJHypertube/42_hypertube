import { useCallback } from 'react'

const useThrottle = (ms: number, callback?: any) => {
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

  return { throttleFunc }
}

export default useThrottle
