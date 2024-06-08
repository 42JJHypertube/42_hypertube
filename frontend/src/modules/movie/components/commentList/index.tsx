'use client'

import ProfileImage from '@/modules/common/components/profileImage'
import styles from './commentList.module.scss'
import { Comment } from '@/types/comment/type'
import { actionWrapper, deleteComment } from '@/lib/data'
import { dateToString } from '@/lib/utill/dateUtils'
import { useState } from 'react'

export default function CommentList({
  comments,
  fetchComments,
}: {
  comments: Comment[]
  fetchComments: () => void
}) {
  // const res = await getProfile()
  // // const myInfo = res.data

  const deleteButtonHandler = async (index: number) => {
    const res = await actionWrapper({
      action: deleteComment,
      param: comments[index].id,
    })
    if (res.response.status === 204) {
      alert('delete success!')
      fetchComments()
    } else {
      alert('delete fail!')
    }
  }

  return (
    <div>
      <ul className={styles.commnetList}>
        {comments.map((comment, index) => (
          <li className={styles.comment} key={index}>
            <div className={styles.commentAvater}>
              <ProfileImage imageUrl={comment.user.imageUrl} />
            </div>
            <div className={styles.commentContent}>
              <div className={styles.commentHead}>
                <div className={styles.commentAuthorWrapper}>
                  <div className={styles.commentAuthor}>
                    {comment.user.nickname}
                  </div>
                  <div className={styles.commentDate}>
                    {dateToString(comment.commentedAt)}
                  </div>
                </div>
                <div className={styles.commentButtonGroup}>
                  <button className={styles.editButton}>수정</button>
                  <button
                    onClick={() => deleteButtonHandler(index)}
                    className={styles.deleteButton}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className={styles.commentBody}>{comment.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
