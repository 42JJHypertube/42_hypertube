'use server'

import {
  getAuthCode,
  goLogin,
  veriftyAuthCode,
  makeUser,
  checkEmail,
} from '@/lib/data'
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
      .then((res) => res)
      .catch(() => 'error')

    console.log(ret)
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

  console.log(ret)
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

    const { data, response } = await goLogin({
      email: info.email,
      password: info.password,
    })

    // if login success
    if (response?.status === 200) {
      if (data?.accessToken)
        cookies().set('access_token', data?.accessToken, {
          httpOnly: true,
        })
      if (data?.refreshToken)
        cookies().set('refresh_token', data?.refreshToken, {
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

export async function validEmail(
  currentState: {
    email: string | null
    auth: string | null
    message: string | null
  },
  formData: FormData,
) {
  const email = formData.get('email') as string
  const { data, response } = await checkEmail(email)

  console.log(data)
  if (data.emailExist && data.passwordExist)
    return {
      email,
      auth: 'password',
      message: null,
    }

  if (data.emailExist)
    return {
      email,
      auth: 'email',
      message: null,
    }

  if (response.status !== 200) {
    return {
      email,
      auth: null,
      message: '에러가 발생했습니다.',
    }
  }
  return {
    email,
    auth: 'password',
    message: '존재하지 않는 아이디 입니다.',
  }
}

export async function loginByEmail(
  currentState: {
    email: string | null
    auth: string | null
    message: string | null
  },
  formData: FormData,
) {
  const email = currentState.email as string
  const code = formData.get('code') as string
  const { data, response } = await checkEmail(code)

  if (data.emailExist && data.passwordExist)
    return {
      email,
      auth: 'password',
      message: null,
    }

  if (data.emailExist)
    return {
      email,
      auth: 'email',
      message: null,
    }

  if (response.status !== 200) {
    return {
      email,
      auth: null,
      message: '에러가 발생했습니다.',
    }
  }
  return {
    email,
    auth: null,
    message: '존재하지 않는 아이디 입니다.',
  }
}

export async function loginByPw(
  currentState: {
    email: string | null
    auth: string | null
    message: string | null
  },
  formData: FormData,
) {
  const email = currentState.email as string
  const password = formData.get('password') as string
  const { data, response } = await checkEmail(password)

  if (data.emailExist && data.passwordExist)
    return {
      email,
      auth: 'password',
      message: null,
    }

  if (data.emailExist)
    return {
      email,
      auth: 'email',
      message: null,
    }

  if (response.status !== 200) {
    return {
      email,
      auth: null,
      message: '에러가 발생했습니다.',
    }
  }
  return {
    email,
    auth: null,
    message: '존재하지 않는 아이디 입니다.',
  }
}
