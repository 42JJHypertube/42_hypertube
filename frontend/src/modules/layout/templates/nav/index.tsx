import Link from 'next/link'
import NavLogin from './navLogin'
import styles from './nav.module.scss'
import { getProfile } from '@/lib/data'

export default async function Nav() {
  const res = await getProfile()

  return (
    <div className={styles.stickyContainer}>
      <header>
        <nav className={styles.navContainer}>
          <Link className={styles.link} href="/">
            Main
          </Link>
          <div className="menubar">menuBar</div>
          <div className="searchBar">serachBar</div>
          <Link className={styles.link} href="/account">
            Account
          </Link>
          <NavLogin isLogined={res.response.status === 200 ? true : false} />
        </nav>
      </header>
    </div>
  )
}
