import styles from './nav.module.scss'

export default function Nav() {
  return (
    <div className={styles.stickyContainer}>
      <header>
        <nav className={styles.navContainer}>
          <div>main logo</div>
          <div className="menubar">menuBar</div>
          <div className="searchBar">serachBar</div>
          <div className="Account">Account</div>
          <div className="Language">Language</div>
        </nav>
      </header>
    </div>
  )
}
