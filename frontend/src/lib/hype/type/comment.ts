import { Comment } from "@/types/comment/type"

export type ResGetCommentList = {
  data: {
    comments: Comment[]
  }
}
