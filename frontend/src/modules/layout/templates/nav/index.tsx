import Link from 'next/link'
import styles from './nav.module.scss'

export default function Nav() {
  return (
    <div className={styles.stickyContainer}>
      <header>
        <nav className={styles.navContainer}>
          <div>main logo</div>
          <div className="menubar">menuBar</div>
          <div className="searchBar">serachBar</div>
          <Link className={styles.link} href="/account">
            Account
          </Link>
          <div className="Language">Language</div>
        </nav>
      </header>
    </div>
  )
}
