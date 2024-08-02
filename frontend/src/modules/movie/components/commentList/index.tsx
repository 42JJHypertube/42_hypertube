'use client'

import ProfileImage from '@/modules/common/components/profileImage'
import styles from './commentList.module.scss'
import { Comment as CommentInfo } from '@/types/comment/type'
import {
  actionWrapper,
  deleteComment,
  getProfile,
  updateComment,
} from '@/lib/data'
import { dateToString } from '@/lib/utill/dateUtils'
import { useState } from 'react'
import FormButton from '@/modules/common/components/formButton'

function CommentEditInput() {
  return (
    <div className={styles.commentContent}>
      <input className={styles.editInput} type="text" />
      <div className={styles.commentEditButtonGroup}>
        <FormButton type="submit" content="수정" positive />
      </div>
    </div>
  )
}

function Header({
  comment,
  index,
  deleteButtonHandler,
  editButtonHandler,
}: {
  comment: CommentInfo
  index: number
  deleteButtonHandler: (index: number) => void
  editButtonHandler: (index: number) => void
}) {
  return (
    <div className={styles.commentHead}>
      <div className={styles.commentAuthorWrapper}>
        <div className={styles.commentAuthor}>{comment.user.nickname}</div>
        <div className={styles.commentDate}>
          {dateToString(comment.commentedAt)}
        </div>
      </div>
      <div className={styles.commentButtonGroup}>
        <button
          onClick={() => editButtonHandler(index)}
          className={styles.editButton}
        >
          수정
        </button>
        <button
          onClick={() => deleteButtonHandler(index)}
          className={styles.deleteButton}
        >
          삭제
        </button>
      </div>
    </div>
  )
}

function Comment({
  comment,
  index,
  deleteButtonHandler,
  editButtonHandler,
}: {
  comment: CommentInfo
  index: number
  deleteButtonHandler: (index: number) => void
  editButtonHandler: (index: number) => void
}) {
  return (
    <>
      <div className={styles.commentAvater}>
        <ProfileImage imageUrl={comment.user.imageUrl} />
      </div>
      <div className={styles.commentContent}>
        <Header
          comment={comment}
          index={index}
          deleteButtonHandler={deleteButtonHandler}
          editButtonHandler={editButtonHandler}
        />

        <div className={styles.commentBody}>{comment.content}</div>
      </div>
    </>
  )
}

export default function CommentList({
  comments,
  fetchComments,
}: {
  comments: CommentInfo[]
  fetchComments: () => void
}) {
  // const res = await getProfile()
  // const myInfo = res.data
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

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

  const editButtonHandler = (index: number) => {
    setEditingIndex(index)
  }

  const editCommentSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    index: number,
  ) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector('input')
    if (!input) return

    const content = input.value
    if (!content || content.length === 0) return

    const res = await actionWrapper({
      action: updateComment,
      param: { commentId: comments[index].id, payload: { content: content } },
    })

    if (res.response.status === 201) {
      alert('edit success!')
      fetchComments()
    } else {
      alert('edit fail!' + res.response.status)
    }
    setEditingIndex(null)
  }

  return (
    <div>
      <ul className={styles.commnetList}>
        {comments.map((comment, index) => (
          <li className={styles.comment} key={index}>
            {editingIndex === index ? (
              <form
                style={{ width: '100%' }}
                onSubmit={(e) => editCommentSubmit(e, index)}
              >
                <CommentEditInput />
              </form>
            ) : (
              <Comment
                comment={comment}
                index={index}
                deleteButtonHandler={deleteButtonHandler}
                editButtonHandler={editButtonHandler}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
