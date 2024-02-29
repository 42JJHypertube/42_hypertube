'use server'

import { cookies } from 'next/headers'
import HypeClient from '../config'

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

export async function getToken(customHeaders: any = {}) {
  return HypeClient.auth
    .getAccessToken(customHeaders)
    .then((res) => res)
    .catch((error) => error)
}

export async function getProfile(customHeaders: any = {}): Promise<{ data: any; response: any }> {
  // customHeader가 존재하지않을시 Cookie에서 가져와서 생성
  if (Object.keys(customHeaders).length === 0){
    const refresh_token = (cookies().get('refresh_token')?.value)
    const access_token = (cookies().get('access_token')?.value)
    const cookie = `access_token=${access_token}; refresh_token=${refresh_token}`
    const newHeaders = {'Cookie': cookie}
    customHeaders = newHeaders
  }

  try {
    console.log("go getProfile")
    const { data, response } = await HypeClient.user.getProfile(customHeaders)
    return { data, response }
  } catch (error: any) {
    if (error.response.status === 401) {
      console.log('Get Profile error')
      const { data, response } = await tryGetReAuth(error, customHeaders, getProfile)
      return { data, response }
    }
    return Promise.reject({ data: undefined, ...error })
  }
}

async function tryGetReAuth(
  error: any,
  customHeaders: any,
  nextFunction: (customHeaders: any) => Promise<{ data: any; response: any }>,
): Promise<{ data: any; response: any }> {
  try {
    console.log(customHeaders)
    const { data, response } = await getToken(customHeaders)
    if (response.status === 200) {
      console.log("setCookie")
      // cookies().set('access_token', data?.accessToken, {
      //   httpOnly: true,
      // })
      // cookies().set('refresh_token', data?.refreshToken, {
      //   httpOnly: true
      // })
      const newHeaders = {...customHeaders, Cookie: `access_token=${data.access_token}; refresh_token=${data.refresh_token}`}
      return tryNextFunction(nextFunction, newHeaders)
    }
  } catch (error: any) {
    console.log('tryGetReAuth Failure')
    return Promise.reject({ data: undefined, ...error })
  }
  return Promise.reject({ data: undefined, ...error })
}

async function tryNextFunction(
  customHeaders: any,
  nextFunction: (customHeaders: any) => Promise<{ data: any; response: any }>,
): Promise<{
  data: any
  response: any
}> {
  try {
    const { data, response } = await getProfile(customHeaders)
    return { data, response }
  } catch (error: any) {
    console.log("tryNextFunction Fail")
    console.log(error)
    return Promise.reject({ data: undefined, ...error })
  }
}
