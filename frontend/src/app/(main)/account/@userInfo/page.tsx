import { getProfile, logOut } from '@/lib/data'
import { notFound } from 'next/navigation'
import ChangePassword from '@/modules/account/components/changePassword'
import ChangeImage from '@/modules/account/components/changeImage'
import ChangeNickname from '@/modules/account/components/changeNickname'
import styles from './useInfo.module.scss'
import LogoutButton from '@/modules/common/components/logoutButton'
import Button from '@/modules/common/components/button'

export default async function UserInfo() {
  const { data, response } = await getProfile()

  if (response.status !== 200) notFound()

  const { nickname, email, firstName, lastName, imageUrl } = data

  return (
    <div className={styles.container}>
      <p>Email: {email}</p>
      <p>
        Name: {firstName} {lastName}
      </p>
      <ChangeImage imageUrl={imageUrl} />
      <ChangeNickname nickname={nickname} />
      <ChangePassword email={email} />
      <LogoutButton />
    </div>
  )
}
