import { getProfile } from '@/lib/data'
import styles from './layout.module.scss'

export default async function AccountPageLayout({
  userInfo,
  login,
}: {
  userInfo: React.ReactNode
  login: React.ReactNode
}) {
  const res = await getProfile()

  return (
    <div className={styles.container}>
      {res.response.status === 200 ? userInfo : login}
    </div>
  )
}
