import Link from 'next/link'
import NavLogin from './navLogin'
import styles from './nav.module.scss'
import NavSearchBar from './navSearchBar'

export default async function Nav() {
  return (
    <header className={styles.stickyContainer}>
      <nav className={styles.navContainer}>
        <Link className={styles.home} href="/">
          HYPER TUBE
        </Link>
        <NavSearchBar />
        <NavLogin />
      </nav>
    </header>
  )
}
