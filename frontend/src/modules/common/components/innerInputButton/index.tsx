'use client'

import styles from './index.module.scss'

function InnerInputButton({
  title,
  onClick,
  pending = false,
}: {
  title: string
  onClick: () => void
  pending?: boolean
}) {
  return (
    <button
      className={styles.container}
      type="button"
      onClick={pending ? () => {} : onClick}
    >
      {pending ? '...' : title}
    </button>
  )
}

export default InnerInputButton
