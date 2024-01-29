import styles from './footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.container}>
      <span className={styles.title}> HYPER TUBE </span>
      <span className={styles.people}> made by jaehyuki & junhjeon </span>
      <span className={styles.at}> @2024</span>
    </div>
  )
}
