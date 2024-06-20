import styles from './movieSectionLoading.module.scss'

export default function MovieSectionLoading() {
  return (
    <div className={styles.spinnerBox}>
      <div className={styles.solarSystem}>
        <div className={`${styles.earthOrbit} ${styles.orbit}`}>
          <div className={styles.planet}></div>
          <div className={`${styles.venusOrbit} ${styles.orbit}`}>
            <div className={styles.planet}></div>
            <div className={`${styles.mercuryOrbit} ${styles.orbit}`}>
              <div className={styles.planet}></div>
              <div className={styles.sun}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
