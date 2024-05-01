'use client'

import styles from './index.module.scss'

function InnerInputButton({
  title,
  onClick,
}: {
  title: string
  onClick: () => void
}) {
  return (
    <button
      className={styles.container}
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default InnerInputButton
