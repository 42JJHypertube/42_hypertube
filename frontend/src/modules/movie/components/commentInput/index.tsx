'use client'

import { actionWrapper, createComment } from '@/lib/data'
import styles from './commentInput.module.scss'
import Image from 'next/image'

export default function CommentInput({ movieId }: { movieId: number }) {
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector('input')
    if (!input) return

    const content = input.value
    if (!content || content.length === 0) return

    const res = actionWrapper({
      action: createComment,
      param: { movieId, payload: { content } },
    })
    console.log(res) //TODO : Handle error
  }

  return (
    <form onSubmit={onSubmitHandler} className={styles.form}>
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
