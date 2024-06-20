'use client'

import { useEffect, useState } from 'react'
import { getProfile, actionWrapper } from '@/lib/data'
import Link from 'next/link'
import ProfileImage from '@/modules/common/components/profileImage'
import styles from './navLogin.module.scss'
import { useRouter } from 'next/navigation'

function NavLogin() {
  const [imageUrl, setImageUrl] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [fetchData, setFetchData] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await actionWrapper({ action: getProfile })
        if (res?.response.status === 200) {
          setIsLogin(true)
          setFetchData(true)
          setImageUrl(res.data.imageUrl)
        } else {
          setFetchData(true)
          setImageUrl(null)
          setIsLogin(false)
        }
      } catch (e) {
        setFetchData(true)
        setImageUrl(null)
      }
    }
    fetchData()
  })

  return (
    <div>
      {fetchData &&
        (isLogin ? (
          <div className={styles.container}>
            <div
              onClick={() => router.push('/account')}
              className={styles.profileContainer}
            >
              <ProfileImage
                imageUrl={imageUrl ? imageUrl : '/defaultProfile.jpeg'}
              />
            </div>
          </div>
        ) : (
          <Link className={styles.link} href="/account">
            LogIn
          </Link>
        ))}
    </div>
  )
}

export default NavLogin
