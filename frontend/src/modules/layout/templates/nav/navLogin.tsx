'use client'

import { useEffect, useState } from 'react'
import { getProfile, actionWrapper } from '@/lib/data'
import Link from 'next/link'
import ProfileImage from '@/modules/common/components/profileImage'
import NavLogOut from './navLogOut'
import styles from './navLogin.module.scss'

function NavLogin() {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await actionWrapper({ action: getProfile })
        if (res?.response.status === 200) {
          setImageUrl(res.data.imageUrl)
        } else setImageUrl(null)
      } catch (e) {
        setImageUrl(null)
      }
    }
    fetchData()
  })

  return (
    <div>
      {imageUrl ? (
        <div className={styles.container}>
          <div className={styles.profileContainer}>
            <ProfileImage imageUrl={imageUrl} />
          </div>
          <NavLogOut />
        </div>
      ) : (
        <Link className={styles.link} href="/account">
          LogIn
        </Link>
      )}
    </div>
  )
}

export default NavLogin
