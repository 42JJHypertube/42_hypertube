import { useState, useCallback } from 'react'

const usePreventDup = (ms: number, func: any) => {
  const [isWorking, setIsWorking] = useState<boolean>(false)

  const preventFunc = useCallback(
    (arg: any) => {
      if (isWorking) return

      setIsWorking(true)
      setTimeout(() => {
        func(arg)
        setIsWorking(false)
      }, ms)
    },
    [ms, func],
  )

  return { preventFunc }
}

export default usePreventDup
