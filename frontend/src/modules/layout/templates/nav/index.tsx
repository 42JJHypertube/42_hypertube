import Link from 'next/link'
import NavLogin from './navLogin'
import styles from './nav.module.scss'
import NavGenreSelector from './navGenreSelector'

export default async function Nav() {
  return (
    <div className={styles.stickyContainer}>
      <header>
        <nav className={styles.navContainer}>
          <Link className={styles.link} href="/">
            Main
          </Link>
          <div className="menubar">menuBar</div>
          <NavGenreSelector/>
          <Link className={styles.link} href="/account">
            Account
          </Link>
          <NavLogin />
        </nav>
      </header>
    </div>
  )
}
