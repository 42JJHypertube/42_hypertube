'use client'

import { actionWrapper, getProfile } from '@/lib/data'
import ProfileImage from '@/modules/common/components/profileImage'
import styles from './useInfo.module.scss'
import { useState } from 'react'

export default function UserInfo() {
  const [count, setCount] = useState(1)
  // const res = await getProfile()
  const res = null

  if (res) {
    const { data } = res
    // const { nickname, email, firstName, lastName, imageUrl, roleType } = data
    const { imageUrl } = data
    return (
      <div className={styles.container}>
        <ProfileImage imageUrl={imageUrl} />
      </div>
    )
  }

  return (
    <>
      <div className={styles.container}>
        <ProfileImage imageUrl="./next.svg" />
      </div>
      <button type="submit" onClick={() => actionWrapper(getProfile)}>
        Test
      </button>
      <button onClick={() => setCount(count + 1)}> increasing </button>
      {count}
    </>
  )
}
