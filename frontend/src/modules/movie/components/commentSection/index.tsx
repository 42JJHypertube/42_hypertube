import CommentInput from '../commentInput'
import CommentList from '../commentList'
import styles from './commentSection.module.scss'
import { getCommentList } from '@/lib/data'

export default async function CommentSection({ movieId }: { movieId: number }) {
  const res = await getCommentList(movieId)
  if (res.response.status != 200) {
    console.log(res)
    return (
      <h2>
        Never watched this movie. Watch this movie and leave a first comment
      </h2>
    )
  }
  const { data } = res

  return (
    <div className={styles.container}>
      <h1> Comments - {movieId} </h1>
      <CommentInput movieId={movieId} />
      <CommentList comments={data.comments} />
    </div>
  )
}
