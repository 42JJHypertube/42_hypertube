import ProfileImage from '@/modules/common/components/profileImage'
import styles from './commentList.module.scss'
import { Comment } from '@/types/comment/type'
import { getProfile } from '@/lib/data'

export default async function CommentList({
  comments,
}: {
  comments: Comment[]
}) {
  const res = await getProfile()
  const myInfo = res.data

  // nickname: string
  //   email: string
  //   firstName: string
  //   lastName: string
  //   imageUrl: string
  //   roleType: string

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
                <div className={styles.commentAuthor}>
                  {comment.user.nickname}
                </div>
                |<div className={styles.commentDate}>작성일</div>
                <div>수정</div>
                <div>삭제</div>
              </div>
              <div className={styles.commentBody}>{comment.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
