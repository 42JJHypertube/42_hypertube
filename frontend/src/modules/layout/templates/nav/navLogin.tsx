import { getProfile } from '@/lib/data'
import ProfileImage from '@/modules/common/components/profileImage'
import NavLogOut from './navLogOut'
import styles from './navLogin.module.scss'

async function NavLogin() {
  const res = await getProfile()

  return (
    <div>
      {res.response.status === 200 ? (
        <div className={styles.container}>
          <ProfileImage imageUrl={res.data.imageUrl} />
          <NavLogOut />
        </div>
      ) : null}
    </div>
  )
}

export default NavLogin
