'use server'

import { cookies } from 'next/headers'
import HypeClient from '../config'
import { CustomHeaders } from '../hype/type/common'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { getCookieOption } from '../utill/cookieOption'
/**
 * Client에서 사용하는 Auth가 필요한 ServerAction에만 Wrapping 한다.
 *
 * @param action 실행할 ServerAction // 인증이 필요한 경우만 호출한다
 * @returns {data, response: {status}} 형태로반환
 * 인증에 실패시 token을 재발급 받는 logic을 실행하고, 이도 실패시 /account 로 redirect한다
 */
export async function actionWrapper({action, param} : {action: any, param?: any}) {
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
        const tags = ['auth']
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
      revalidateTag("auth")
      redirect('/account')
    }

    if (ping.response.status !== 200) {
      cookies().delete('access_token')
      cookies().delete('refresh_token')
      revalidateTag("auth")
      redirect('/account')
    }

    const res = await action(param)
    return { data: res.data, response: { status: res.response.status } }
  }

  const res = await action(param)
  return { data: res.data, response: { status: res.response.status}}
}

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

export async function getMovie(page: number) {

  return HypeClient.movie
    .getMovieTopRated(page)
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
    const customHeaders = getCustomHeaders(['auth'])

    return HypeClient.user
      .getProfile(customHeaders)
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
