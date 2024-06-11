'use client'

import styles from './commentInputForm.module.scss'
import Image from 'next/image'

export default function CommentInputForm({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Write your comment..."
          className={styles.input}
        />
        <button type="submit" className={styles.iconButton}>
          <Image src="/icons/rocketActiveIcon.png" alt="send" fill />
        </button>
      </div>
    </form>
  )
}
