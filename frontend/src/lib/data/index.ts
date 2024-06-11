'use server'

import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import HypeClient from '../hype/config'
import { CustomHeaders } from '../hype/type/common'
import getCookieOption from '../utill/cookieOption'

const getCustomHeaders = (tags: string[] = []) => {
  const headers = {
    next: {
      tags,
    },
  } as Record<string, any>

  const accessToken = cookies().get('access_token')?.value
  const refreshToken = cookies().get('refresh_token')?.value

  if (accessToken && refreshToken) {
    headers.cookie = `access_token=${accessToken}; refresh_token=${refreshToken}`
  }

  return headers
}

/**
 *
 * @param payload {email: }
 */
export async function getAuthCode(payload: { email: string }) {
  return HypeClient.auth
    .sendCode(payload)
    .then((res) => res)
    .catch((error) => error)
}

export async function veriftyAuthCode(payload: {
  email: string
  code: string
}) {
  return HypeClient.auth
    .verifyCode(payload)
    .then((res) => res)
    .catch((error) => error)
}

export async function makeUser(payload: {
  nickname: string
  email: string
  password: string
  password2: string
  firstName: string
  lastName: string
  imageUrl: string
  emailToken: string
}) {
  return HypeClient.auth.makeUser(payload)
}

export async function goLogin(payload: { email: string; password: string }) {
  return HypeClient.auth
    .signIn(payload)
    .then((res) => res)
    .catch(() => {
      const response = { status: 400 }
      return { data: undefined, response }
    })
}

export async function getMovie({ pages }: { pages: number }) {
  return HypeClient.movie
    .getMovieTopRated(pages)
    .then((res) => res)
    .catch((error) => error)
}

export async function checkEmail(email: string) {
  return HypeClient.auth
    .checkEmail({ email })
    .then((res) => res)
    .catch((error) => error)
}

export async function loginEmailToken({
  email,
  emailToken,
  password,
}: {
  email: string
  emailToken: string
  password: string
}) {
  return HypeClient.auth
    .loginEmailToken({ email, emailToken, password })
    .then((res) => res)
    .catch((error) => error)
}

export async function loginPassword({
  email,
  emailToken,
  password,
}: {
  email: string
  emailToken: string
  password: string
}) {
  return HypeClient.auth
    .loginPassword({ email, emailToken, password })
    .then((res) => res)
    .catch((error) => error)
}

export async function checkPermission() {
  return HypeClient.auth
    .checkPermission()
    .then((res) => res)
    .catch((error) => error)
}

export async function modifyPassword(payload: {
  password: string
  password2: string
  emailToken: string
}) {
  return HypeClient.auth
    .modifyPassword(payload)
    .then((res) => res)
    .catch((error) => error)
}

export async function getToken(customHeaders: CustomHeaders = {}) {
  return HypeClient.auth
    .getAccessToken(customHeaders)
    .then((res) => {
      revalidateTag('auth')
      return res
    })
    .catch((error) => error)
}

export async function getProfile(customHeaders: CustomHeaders = {}) {
  if (Object.keys(customHeaders).length === 0) {
    const newCustomHeaders = getCustomHeaders(['auth'])

    return HypeClient.user
      .getProfile(newCustomHeaders)
      .then((res) => res)
      .catch((error) => error)
  }

  return HypeClient.user
    .getProfile(customHeaders)
    .then((res) => res)
    .catch((error) => error)
}

export async function logOut() {
  cookies().delete('access_token')
  cookies().delete('refresh_token')
  revalidateTag('auth')
}

export async function changeProfile(image: Blob) {
  const customHeaders = getCustomHeaders(['user'])

  return HypeClient.user
    .changeProfile(customHeaders, image)
    .then((res) => res)
    .catch((error) => error)
}

export async function serachMovie({
  query,
  pages,
  genre,
}: {
  query: string
  pages: number
  genre: number[]
}) {
  return HypeClient.movie
    .serachMovie(pages, genre, query)
    .then((res) => res)
    .catch((error) => error)
}

export async function getMovieDetail({ movie_id }: { movie_id: number }) {
  return HypeClient.movie
    .getMovieDetail({ movie_id })
    .then((res) => res)
    .catch((error) => error)
}

export async function getTorrentData({ imdb_id }: { imdb_id: number }) {
  return HypeClient.torrent
    .getTopCountDonwload(imdb_id)
    .then((res) => res)
    .catch((error) => error)
}

export async function getCommentList(movieId: number) {
  const customHeaders = getCustomHeaders([])

  return HypeClient.comment
    .getCommentList(movieId, customHeaders)
    .then((res) => res)
    .catch((error) => error)
}

export async function postTorrentDownload({
  imdb_id,
  magnetUrl,
}: {
  imdb_id: string
  magnetUrl: string
}) {
  const newCustomHeaders = getCustomHeaders([])

  return HypeClient.download
    .postDownloadTorrent({ imdb_id, magnetUrl }, newCustomHeaders)
    .then((res) => res)
    .catch((error) => error)
}

export async function createComment({
  movieId,
  payload,
}: {
  movieId: number
  payload: { content: string }
}) {
  const customHeaders = getCustomHeaders([])
  return HypeClient.comment
    .postComment(movieId, payload, customHeaders)
    .then((res) => {
      return { data: res.data, response: res.response.status }
    })
    .catch((error) => error)
}

export async function updateComment({
  commentId,
  payload,
}: {
  commentId: number
  payload: { content: string }
}) {
  const customHeaders = getCustomHeaders([])
  return HypeClient.comment
    .putComment(commentId, payload, customHeaders)
    .then((res) => res)
    .catch((error) => error)
}

export async function getMovieInfo({ imdb_id }: { imdb_id: string }) {
  const newCustomHeaders = getCustomHeaders([])

  return HypeClient.download
    .getDownloadMovieInfo({ imdb_id }, newCustomHeaders)
    .then((res) => res)
    .catch((error) => error)
}

export async function deleteComment(commentId: number) {
  const customHeaders = getCustomHeaders([])
  return HypeClient.comment
    .deleteComment(commentId, customHeaders)
    .then((res) => res)
    .catch((error) => error)
}

/**
 * Client에서 사용하는 ServerAction에만 Wrapping 한다.
 *
 * @param action 실행할 ServerAction
 * @returns {data, response: {status}} 형태로반환
 * 인증에 실패시 token을 재발급 받는 logic을 실행하고, 이도 실패시 /account 로 redirect한다
 */
export async function actionWrapper({
  action,
  param,
}: {
  action: any
  param?: any
}) {
  // middleWare를 제거하면 아래 주석에 대해서 고려해볼만 한듯..
  // access_token 과 refresh_token이 존재하면 실행
  if (cookies().has('access_token') && cookies().has('refresh_token')) {
    const tags = ['auth']
    const defaultHeader = {
      next: {
        tags,
      },
    } as Record<string, any>
    defaultHeader.cookie = `access_token=${cookies().get('access_token')?.value}; refresh_token=${cookies().get('refresh_token')?.value}`

    const ping = await getProfile(defaultHeader)

    if (ping.response.status === 401) {
      const newToken = await getToken(defaultHeader)

      // 성공시 새로운 토큰을 통한 action 진행
      if (newToken.response.status === 200) {
        const cookieOptions = getCookieOption()
        cookies().set('access_token', newToken.data.accessToken, cookieOptions)
        cookies().set(
          'refresh_token',
          newToken.data.refreshToken,
          cookieOptions,
        )
        const newHeader = {
          next: {
            tags,
          },
        } as Record<string, any>
        newHeader.cookie = `access_token=${newToken.data.accessToken}; refresh_token=${newToken.data.refreshToken}`
        const res = await action(newHeader)
        revalidateTag('auth')
        return { data: res.data, response: { status: res.response.status } }
      }

      // 실패시 쿠키를 모두 지워주고 account 로 redirect
      cookies().delete('access_token')
      cookies().delete('refresh_token')
      revalidateTag('auth')
      redirect('/account')
    }

    if (ping.response.status !== 200) {
      cookies().delete('access_token')
      cookies().delete('refresh_token')
      revalidateTag('auth')
      redirect('/account')
    }

    const res = await action(param)
    if (res.response.status === 400) {
      console.log(res);
    }
    return { data: res.data, response: { status: res.response?.status } }
  }

  const res = await action(param)
  return { data: res.data, response: { status: res.response?.status } }
}
