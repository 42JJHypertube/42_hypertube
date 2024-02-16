'use server'

import { getAuthCode, goLogin, veriftyAuthCode, makeUser } from '@/lib/data'
import { cookies } from 'next/headers'

interface RegisterInfo {
  email: string
  nickname: string
  lastName: string
  firstName: string
  password: string
  password2: string
  code: string
}

interface LoginInfo {
  email: string
  password: string
}

export type LoginFormInfo = {
  email: string
  password: string
  error_message: string | null
  token: string | null
}

export type RegisterFormInfo = {
  email: string
  nickname: string
  lastName: string
  firstName: string
  password: string
  password2: string
  error_message: string | null
  code: string | null
  token: string | null
}

export async function registUser(
  currentState: RegisterFormInfo,
  formData: FormData,
) {
  const formInfo = {
    email: formData.get('email'),
    nickname: formData.get('nickname'),
    lastName: formData.get('lastname'),
    firstName: formData.get('firstname'),
    password: formData.get('password1'),
    password2: formData.get('password2'),
    code: formData.get('code'),
  } as RegisterInfo

  const currentInfo = {
    nickname: currentState.nickname,
    email: currentState.email,
    password: currentState.password,
    password2: currentState.password2,
    firstName: currentState.firstName,
    lastName: currentState.lastName,
  }

  if (!currentState.token) {
    const payload = {
      email: formInfo.email,
    }

    const ret = await getAuthCode(payload)
      .then((res) => res?.data)
      .catch(() => 'error')

    switch (ret.response.status) {
      case 200:
        return {
          ...formInfo,
          error_message: null,
          code: null,
          token: 'true',
        }
      default:
        return {
          ...formInfo,
          error_message: ret.response.data.message as string,
          code: null,
          token: null,
        }
    }
  }

  const ret = await veriftyAuthCode({
    email: currentState.email,
    code: formData.get('code') as string,
  })
    .then((res) => res)
    .catch((error) => error)

  switch (ret.response.status) {
    case 200: {
      const ret2 = await makeUser({
        ...currentInfo,
        token: ret.data,
        imageUrl: '',
      })
      if (ret2.response.status === 200) {
        return {
          ...currentInfo,
          error_message: '',
          code: 'true',
          token: 'true',
        }
      }
      break
    }
    case 401:
      return {
        ...currentInfo,
        error_message: ret.response.data.message as string,
        code: null,
        token: 'true',
      }
    default:
      return {
        ...currentInfo,
        error_message: ret.response.data.message as string,
        code: null,
        token: null,
      }
  }

  return {
    ...currentInfo,
    error_message: ret.response.data.message as string,
    code: null,
    token: null,
  }
}

export async function loginUser(
  currentState: LoginFormInfo,
  formData: FormData,
) {
  // if token is null => check 2fa first;
  if (!currentState.token) {
    const info = {
      email: formData.get('email'),
      password: formData.get('password'),
    } as LoginInfo

    // const ret = await getAuthCode({email: info.email}).then((res) => res).catch(() => "error")

    const ret = await goLogin({ email: info.email, password: info.password })
      .then((res) => res)
      .catch((error) => error)

    // if login success
    if (ret.response.status === 200) {
      cookies().set('access_token', ret.data.accessToken, {
        httpOnly: true,
      })
      cookies().set('refresh_token', ret.data.refreshToken, {
        httpOnly: true,
      })
    }

    return {
      email: info.email,
      password: info.password,
      error_message: null,
      token: 'hello',
    }
  }

  // if have token do login logic
  return {
    email: currentState.email,
    password: currentState.password,
    error_message: null,
    token: null,
  }
}
