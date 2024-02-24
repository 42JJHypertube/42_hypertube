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
  token: string
}) {
  return HypeClient.user.makeUser(payload)
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
