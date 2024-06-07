export type UserInfo = {
  nickname: string
  email: string
  firstName: string
  lastName: string
  imageUrl: string
  roleType: string
}

export type MovieInfo = {
  id: number
  imdbId: string
  torrentHash: string
  hlsPlaylistPath: string
  movieState: string
}
