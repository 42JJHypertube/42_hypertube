'use server'

import { cookies } from 'next/headers'
import HypeClient from '../config'
import { CustomHeaders } from '../hype/type/common'

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
    .then((res) => {
      return { data: res.data, response: res.response }
    })
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
    .then((res) => res)
    .catch((error) => error)
}

export async function getProfile(customHeaders: CustomHeaders = {}) {
  // customHeader가 존재하지않을시 Cookie에서 가져와서 생성
  if (Object.keys(customHeaders).length === 0) {
    const refreshToken = cookies().get('refresh_token')?.value
    const accessToken = cookies().get('access_token')?.value
    const cookie = `access_token=${accessToken}; refresh_token=${refreshToken}`
    const newHeaders = { Cookie: cookie }
    return HypeClient.user
      .getProfile(newHeaders)
      .then((res) => res)
      .catch((error) => error)
  }

  console.log('go getProfile')
  return HypeClient.user
    .getProfile(customHeaders)
    .then((res) => res)
    .catch((error) => error)
}
