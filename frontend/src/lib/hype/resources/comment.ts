import BaseResource from './base'
import { ResponsePromise, CustomHeaders } from '../type/common'
import { ResGetProfile } from '../type/user'
import { ResGetCommentList } from '../type/comment'

class CommentResource extends BaseResource {
  getCommentList(
    movieId: number,
    customHeaders?: CustomHeaders,
  ): ResponsePromise<ResGetCommentList> {
    const path = `/comments/movies/${movieId}`
    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  postComment(
    movieId: number,
    payload: Record<string, string | null>,
    customHeaders?: CustomHeaders,
  ) {
    const path = `/comments/movies/${movieId}`
    return this.client.request('POST', path, payload, {}, customHeaders)
  }

  putComment(
    commentId: number,
    payload: Record<string, string | null>,
    customHeaders?: CustomHeaders,
  ) {
    const path = `/comments/${commentId}`
    return this.client.request('POST', path, payload, {}, customHeaders)
  }

  deleteComment(commentId: number, customHeaders?: CustomHeaders) {
    const path = `/comments/${commentId}`
    return this.client.request('DELETE', path, {}, {}, customHeaders)
  }
}

export default CommentResource
