'use client'

import { useEffect, useState } from 'react'
import CommentList from '../commentList'
import styles from './commentSection.module.scss'
import { actionWrapper, createComment, getCommentList } from '@/lib/data'
import { Comment } from '@/types/comment/type'
import CommentInputForm from '../commentInput'

export default async function CommentSection({ movieId }: { movieId: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isMovieExist, setIsMovieExist] = useState<boolean>(false)
  
  const fetchComments = async () => {
    const res = await actionWrapper({
      action: getCommentList,
      param: movieId,
    })
    if (res.response.status === 200) {
      setComments(res.data.comments)
      setIsMovieExist(true)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector('input')
    if (!input) return

    const content = input.value
    if (!content || content.length === 0) return

    const res = await actionWrapper({
      action: createComment,
      param: { movieId, payload: { content } },
    })
    await fetchComments()
    console.log(res) //TODO : Handle error
  }

  useEffect(() => {
    fetchComments()
  }, [])

  if (isMovieExist === false) {
    return (
      <h2 className={styles.movieNotExits}>
        This movie has never been watched. Please watch the movie and write the
        first comment
      </h2>
    )
  }

  return (
    <div className={styles.container}>
      <h1> Comments </h1>
      <CommentInputForm onSubmit={handleCommentSubmit} />
      <CommentList comments={comments} fetchComments={fetchComments} />
    </div>
  )
}
