import ProfileImage from '@/modules/common/components/profileImage'
import styles from './commentList.module.scss'
import { Comment } from '@/types/comment/type'

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div>
      <ul className={styles.commnetList}>
        {comments.map((comment, index) => (
          <li className={styles.comment} key={index}>
            <div className={styles.commentAvater}>
              <ProfileImage imageUrl={comment.user.imageUrl} />
            </div>
            <div className={styles.commentContent}>{comment.content}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
