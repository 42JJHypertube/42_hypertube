'use client'

import FormButton from '@/modules/common/components/formButton'
import styles from './commentInput.module.scss'
import Image from 'next/image'

export default function CommentInput() {
  return (
    <form className={styles.form}>
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
