'use server'

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
      console.log(res.response)
      return { data: res.data, response: { status: 200 } }
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

export async function getToken() {
  return HypeClient.auth
    .getAccessToken()
    .then((res) => res)
    .catch((error) => Promise.reject({ ...error, data: false }))
}

export async function getProfile(): Promise<{ data: any; response: any }> {
  try {
    const { data, response } = await HypeClient.user.getProfile()
    return { data, response }
  } catch (error: any) {
    if (error?.status === 401) {
      return tryGetReAuth(error, getProfile)
    }
    return Promise.reject({ ...error })
  }
}

async function tryGetReAuth(
  error: any, nextFunction: () => Promise<{data: any, response: any}>
): Promise<{ data: any; response: any }> {
  try {
    const { data, response } = await getToken()
    if (response.status === 200) {
      return tryNextFunction(nextFunction)
    }
  } catch {
    return Promise.reject({ ...error })
  }
  return Promise.reject({ ...error })
}

async function tryNextFunction(nextFunction: () => Promise<{data: any, response: any}>): Promise<{
  data: any
  response: any
}> {
  try {
    const { data, response } = await getProfile()
    return Promise.reject({ data, response })
  } catch {
    return Promise.reject({ data: undefined, response: undefined })
  }
}
