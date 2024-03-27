import { getProfile } from '@/lib/data'
import ProfileImage from '@/modules/common/components/profileImage'
import styles from './useInfo.module.scss'

export default async function UserInfo() {
  const res = await getProfile()
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
    <div className={styles.container}>
      <ProfileImage imageUrl="./next.svg" />
    </div>
  )
}
