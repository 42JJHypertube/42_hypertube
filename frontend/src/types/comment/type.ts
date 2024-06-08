import { MovieInfo, UserInfo } from '../common/type'

export type Comment = {
  id: number
  movie: MovieInfo
  user: UserInfo
  content: string
  commentedAt: Date
}
