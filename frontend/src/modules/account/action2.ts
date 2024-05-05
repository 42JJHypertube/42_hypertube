'use server'

import {
  checkEmail,
  getAuthCode,
  loginEmailToken,
  loginPassword,
  makeUser,
  modifyPassword,
  veriftyAuthCode,
} from '@/lib/data'
import { getCookieOption } from '@/lib/utill/cookieOption'
import { AuthForm, LoginForm, RegistForm } from '@/types/account/type'
import { cookies } from 'next/headers'

// login 시 계정의 인증방식이 password인지 email인지 구별해주는 함수.
// 계정이 없을 시 error message 반환 -> 이후에 자동으로 가입페이지로 이동 할 수 있도록 수정
async function checkLoginType({ email }: { email: string }) {
  const { data, response } = await checkEmail(email)
  if (response.status === 200) {
    if (data.passwordExist)
      return {
        loginType: 'password',
      }
    if (data.emailExist)
      return {
        loginType: 'email',
      }
    if (!data.emailExist && !data.password)
      return {
        loginType: 'regist',
      }
  }
  return {
    loginType: null,
  }
}

export async function login(currentState: LoginForm, formData: FormData) {
  const email = formData.get('email') as string

  // 로그인 방식 판별
  if (currentState.loginType === null) {
    const res = await checkLoginType({ email })
    if (res.loginType === 'email') {
      const { data, response } = await getAuthCode({ email })
      console.log(data)
      if (response.status !== 200)
        return {
          ...currentState,
          message: '다시 시도해주세요',
        }

      return {
        ...currentState,
        message: null,
        email,
        loginType: 'email',
      }
    }

    if (res.loginType === 'password')
      return {
        ...currentState,
        email,
        message: null,
        loginType: 'password',
      }

    if (res.loginType === 'regist')
      return {
        ...currentState,
        email,
        message: null,
        noAccount: true,
      }

    return {
      ...currentState,
      message: '에러가 발생했습니다. 다시 시도해주세요',
    }
  }

  // password 로그인
  if (currentState.loginType === 'password') {
    const password = formData.get('password') as string
    const { data, response } = await loginPassword({
      email,
      emailToken: '',
      password,
    })
    if (response?.status === 200) {
      const cookieOptions = getCookieOption()
      cookies().set('access_token', data?.accessToken, cookieOptions)
      cookies().set('refresh_token', data?.refreshToken, cookieOptions)

      return {...currentState, message: null}
    }
  }

  return {
    ...currentState,
    message: '오류가 발생했습니다. 다시 시도해 주세요',
  }
}

export async function loginWithEmail(
  currentState: AuthForm,
  formData: FormData,
) {
  const email = formData.get('email') as string
  const code = formData.get('code') as string

  const res = await veriftyAuthCode({ email, code })
  if (res.response.status === 200) {
    const emailToken = res.data.emailToken
    const { data, response } = await loginEmailToken({
      email,
      emailToken,
      password: '',
    })
    if (response?.status === 200) {
      const cookieOptions = getCookieOption()
      cookies().set('access_token', data?.accessToken, cookieOptions)
      cookies().set('refresh_token', data?.refreshToken, cookieOptions)

      return currentState
    }
    return {
      ...currentState,
      message: '오류가 발생했습니다.',
    }
  }

  return {
    ...currentState,
    message: '코드 인증에 실패했습니다',
  }
}

export async function requestAuthCode(email: string) {
  const { data, response } = await getAuthCode({ email })
  if (response.status === 200) {
    console.log(data)
    return {
      success: true,
    }
  }

  return {
    success: false,
  }
}

// 마음에안듬.
export async function requestRegistAuthCode(
  currentState: AuthForm,
  formData: FormData,
) {
  const email = formData.get('email') as string
  const code = formData.get('code') as string

  if (code) {
    const res = await veriftyAuthCode({ email, code })
    if (res.response.status === 200)
      return {
        ...currentState,
        email,
        codeSended: true,
        emailToken: res.data.emailToken as string,
      }

    return {
      ...currentState,
      message: '인증 중 에러가 발생했습니다.',
    }
  }

  const { data, response } = await checkEmail(email)
  if (response.status !== 200) {
    return {
      ...currentState,
      message: '에러가 발생했습니다.',
    }
  }
  if (data.emailExist) {
    return {
      ...currentState,
      message: '이미 존재하는 계정입니다!',
    }
  }

  const res = await getAuthCode({ email })
  if (res.response.status === 200) {
    console.log(res.data)
    return {
      ...currentState,
      email,
      codeSended: true,
      message: null,
    }
  }

  return {
    ...currentState,
    email,
    message: '오류가 발생했습니다. 다시 시도해주세요',
  }
}

export async function registUser(currentState: RegistForm, formData: FormData) {
  const formInfo = {
    nickname: formData.get('nickname') as string,
    lastName: formData.get('lastName') as string,
    firstName: formData.get('firstName') as string,
    password: formData.get('password') as string,
    password2: formData.get('password2') as string,
  }

  if (formInfo.password !== formInfo.password2) {
    return {
      ...currentState,
      message: 'Confirm Password 가 일치하지 않습니다.',
    }
  }
  const email = formData.get('email') as string
  const emailToken = formData.get('emailToken') as string
  const { response } = await makeUser({
    ...formInfo,
    email,
    emailToken,
    imageUrl: '',
  })

  if (response?.status === 200) {
    return {
      ...currentState,
      success: true,
      message: '회원가입에 성공했습니다',
    }
  }
  return {
    ...currentState,
    message: '에러가 발생했습니다.',
  }
}

export async function setPassword(
  currentState: {
    code: null | string
    emailToken: null | string
    message: null | string
    email: string
    getCode: boolean
    success: boolean
  },
  formData: FormData,
) {
  const defaultres = {
    ...currentState,
  }
  const code = formData.get('code') as string
  const emailToken = currentState.emailToken
  const email = currentState.email

  if (!code && !emailToken) {
    const res = await getAuthCode({ email })
    console.log(res.data)
    if (res.response.status === 200) {
      return {
        ...defaultres,
        getCode: true,
      }
    }
    return {
      ...defaultres,
      getCode: false,
    }
  }

  if (code) {
    const res = await veriftyAuthCode({ email, code })
    if (res.response.status === 200)
      return {
        ...defaultres,
        code: null,
        message: null,
        emailToken: res.data.emailToken,
      }
    return {
      ...defaultres,
      code: null,
      message: '잘못된 코드입니다',
    }
  }

  if (emailToken) {
    const password = formData.get('password') as string
    const password2 = formData.get('password2') as string

    if (password !== password2)
      return {
        ...defaultres,
        message: '비밀번호 확인이 일치하지 않습니다.',
      }
    const res = await modifyPassword({password, password2, emailToken})
    if (res.response.status === 200)
      return {
        ...defaultres,
        success: true
    }
  }

  return {
    ...defaultres,
    message: '에러가 발생했습니다.'
  }
}
