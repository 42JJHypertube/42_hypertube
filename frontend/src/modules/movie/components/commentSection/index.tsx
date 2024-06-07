import CommentInput from '../commentInput'
import CommentList from '../commentList'
import styles from './commentSection.module.scss'

export default function CommentSection({ movieId }: { movieId: number }) {
  return (
    <div className={styles.container}>
      <h1> Comments -> {movieId} </h1>
      <CommentInput />
      <CommentList />
    </div>
  )
}
