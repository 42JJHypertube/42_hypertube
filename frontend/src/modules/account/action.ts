'use server'

import {
  getAuthCode,
  veriftyAuthCode,
  makeUser,
  checkEmail,
  loginPassword,
  loginEmailToken,
} from '@/lib/data'
import { LoginForm } from '@/types/account/type'
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

export async function validEmail(currentState: LoginForm, formData: FormData) {
  const email = formData.get('email') as string
  const { data, response } = await checkEmail(email)

  const defaultRes: LoginForm = {
    email,
    auth: currentState.auth,
    password: currentState.password,
    code: currentState.code,
    message: currentState.message,
  }

  // 이메일이 존재하고 패스워드가 설정되어있는 경우
  if (data?.emailExist && data?.passwordExist)
    return {
      ...defaultRes,
      auth: 'password',
      message: null,
    }

  // 이메일은 존재하지만 패스워드가 설정되어 있지 않는 경우
  if (data?.emailExist) {
    const ret = await getAuthCode({ email })

    if (ret?.response.status === 200)
      return {
        ...defaultRes,
        auth: 'email',
        message: null,
      }

    return {
      ...defaultRes,
      message: '에러가 발생했습니다. 다시 시도해주세요',
    }
  }

  // 성공했지만, 위의 경우에 안걸린 경우 -> 아이디가 존재하지않음
  if (response?.status === 200)
    return {
      ...defaultRes,
      auth: 'email',
      message: '존재하지 않는 아이디 입니다.',
    }

  // 위의 경우에 전부 걸리지않았다 -> 에러 발생
  return {
    ...defaultRes,
    auth: 'none',
    message: '에러가 발생했습니다.',
  }
}

export async function loginByPassword(
  currentState: LoginForm,
  formData: FormData,
) {
  const defaultRes: LoginForm = {
    ...currentState,
  }
  const email = currentState.email as string
  const password = formData.get('password') as string
  const emailToken = ''
  const { data, response } = await loginPassword({
    email,
    password,
    emailToken,
  })

  // 로그인에 성공햇을 경우 쿠키 세팅
  if (response.status === 200) {
    cookies().set('access_token', data?.accessToken, {
      httpOnly: true,
    })
    cookies().set('refresh_token', data?.refreshToken, {
      httpOnly: true,
    })
    return defaultRes
  }

  // 로그인이 실패했을 때 에러메세지 반환
  return {
    ...defaultRes,
    message: '잘못된 패스워드 입니다 or 에러가 발생했습니다.',
  }
}

export async function loginByEmail(
  currentState: LoginForm,
  formData: FormData,
) {
  const defaultRes: LoginForm = {
    ...currentState,
  }
  const email = currentState.email as string
  const code = formData.get('code') as string

  // code를 이용해서 email Token 을 받아옴
  const ret = await veriftyAuthCode({ email, code })
  if (ret.response?.status === 200) {
    const { emailToken } = ret.data
    const password = ''
    const { data, response } = await loginEmailToken({
      email,
      emailToken,
      password,
    })

    // 로그인 성공시 쿠키 세팅
    if (response?.status === 200) {
      cookies().set('access_token', data?.accessToken, {
        httpOnly: true,
      })
      cookies().set('refresh_token', data?.refreshToken, {
        httpOnly: true,
      })
      return defaultRes
    }

    // 실패시 에러메시지 반환
    return {
      ...defaultRes,
      message: '에러가 발생했습니다, 다시 시도해 주세요',
    }
  }

  // verifyCode에서 에러 발생시 에러메세지 반환
  return {
    ...defaultRes,
    message: '유효하지 않은 코드입니다',
  }
}
