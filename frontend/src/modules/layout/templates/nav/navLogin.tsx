'use client'

import { getProfile, actionWrapper } from '@/lib/data'
import ProfileImage from '@/modules/common/components/profileImage'
import NavLogOut from './navLogOut'
import styles from './navLogin.module.scss'
import { useEffect, useState } from 'react'

function NavLogin({ isLogined }: { isLogined: boolean }) {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    console.log(isLogined)
    console.log(imageUrl)
    const fetchData = async () => {
      try {
        const res = await actionWrapper(getProfile)
        if (res?.response.status === 200) {
          setImageUrl(res.data.imageUrl)
        } else setImageUrl(null)
      } catch (e) {
        setImageUrl(null)
      }
    }
    if (isLogined)
      fetchData()
    else
      setImageUrl(null)
  }, [isLogined])

  return (
    <div>
      {imageUrl ? (
        <div className={styles.container}>
          <ProfileImage imageUrl={imageUrl} />
          <NavLogOut />
        </div>
      ) : null}
    </div>
  )
}

export default NavLogin
