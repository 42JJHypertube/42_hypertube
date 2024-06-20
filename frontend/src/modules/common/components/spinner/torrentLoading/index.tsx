'use client'

import styles from './index.module.scss'

function TorrentLoadingSpinner({ per }: { per: number }) {
  return (
    <div className={styles.out}>
      <div className={styles.fadeIn}>
        <div className={styles.container}>
          <div className={`${styles.one} ${styles.common}`}></div>
          <div className={`${styles.two} ${styles.common}`}></div>
          <div className={`${styles.three} ${styles.common}`}></div>
          <div className={`${styles.four} ${styles.common}`}></div>
          <div className={`${styles.five} ${styles.common}`}></div>
          <div className={`${styles.six} ${styles.common}`}></div>
          <div className={`${styles.seven} ${styles.common}`}></div>
          <div className={`${styles.eight} ${styles.common}`}></div>
        </div>
        <div className={styles.bar}>
          <div className={styles.progress} style={{ width: `${per}%` }} />
        </div>
      </div>
    </div>
  )
}

export default TorrentLoadingSpinner
