import ProfileImage from '@/modules/common/components/profileImage'
import styles from './commentList.module.scss'

export default function CommentList() {
  const comments = [
    'Comment 1 Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1',
    'Comment 2',
    'Comment 3',
  ] // Replace with your actual comment data

  return (
    <div>
      <ul className={styles.commnetList}>
        {comments.map((comment, index) => (
          <li className={styles.comment} key={index}>
            <div className={styles.commentAvater}>
              <ProfileImage imageUrl="/defaultProfile.jpeg" />
            </div>
            <div className={styles.commentContent}>{comment}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
