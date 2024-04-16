'use client'
import { actionWrapper, getProfile } from '@/lib/data'

const TestButton = () => {
  return (
    <button type="submit" onClick={() => actionWrapper(getProfile)}>
      Test
    </button>
  )
}

export default TestButton
