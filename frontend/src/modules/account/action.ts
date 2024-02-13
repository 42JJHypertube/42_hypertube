'use server'

import { getAuthCode, goLogin } from '@/lib/data'

interface RegisterInfo {
  email: string
  username: string
  lastname: string
  firstname: string
  password: string
}

interface LoginInfo {
  email: string
  password: string
}

export type LoginFormInfo = {
  email: string
  password: string
  error_message: string | null
  auth_token: string | null
}

export type RegisterFormInfo = {
  email: string
  username: string
  lastname: string
  firstname: string
  password: string
  error_message: string | null
  auth_token: string | null
}

export async function registUser(
  currentState: RegisterFormInfo,
  formData: FormData,
) {
  if (!currentState.auth_token) {
    console.log('check 2fa')
    const info = {
      email: formData.get('email'),
      username: formData.get('username'),
      lastname: formData.get('lastname'),
      firstname: formData.get('firstname'),
      password: formData.get('password'),
    } as RegisterInfo

    const payload = {
      email: info.email,
    }

    const ret = await getAuthCode(payload)
      .then((res) => res?.response)
      .catch(() => 'error')

    console.log(ret)
    return {
      email: info.email,
      username: info.username,
      lastname: info.lastname,
      firstname: info.firstname,
      password: info.firstname,
      error_message: null,
      auth_token: 'hello',
    }
  }

  return {
    email: currentState.email,
    username: currentState.username,
    lastname: currentState.lastname,
    firstname: currentState.firstname,
    password: currentState.firstname,
    error_message: null,
    auth_token: null,
  }
}

export async function loginUser(
  currentState: LoginFormInfo,
  formData: FormData,
) {
  // if auth_token is null => check 2fa first;
  if (!currentState.auth_token) {
    const info = {
      email: formData.get('email'),
      password: formData.get('password'),
    } as LoginInfo

    // const ret = await getAuthCode({email: info.email}).then((res) => res).catch(() => "error")

    const ret = await goLogin({ email: info.email, password: info.password })
      .then((res) => res)
      .catch(() => 'login Error')

    console.log('login : ', ret)
    return {
      email: info.email,
      password: info.password,
      error_message: null,
      auth_token: 'hello',
    }
  }

  // if have auth_token do login logic
  return {
    email: currentState.email,
    password: currentState.password,
    error_message: null,
    auth_token: null,
  }
}

export async function confirm2FA(currentState: unknown, formData: FormData) {
  const info = {
    code: formData.get('code'),
  }
  console.log(info)
}
