'use server'

import {
  getAccountInfo,
  getAuthCode,
  loginEmailToken,
  loginPassword,
  modifyPassword,
  verifyAuthCode,
} from '@/lib/data'
import getCookieOption from '@/lib/utill/cookieOption'
import { LoginForm, LoginType } from '@/types/account/type'
import { cookies } from 'next/headers'
import { updateError, updateForm } from '@/lib/utill/formUtils'

export async function requestAuthCode(email: string) {
  const { data, response } = await getAuthCode({ email })
  if (response.status === 200) {
    console.log(data)
    return true
  }

  return false
}

// login 시 계정의 인증방식이 password인지 email인지 구별해주는 함수.
export async function getLoginType(
  currentState: LoginForm,
  formData: FormData,
) {
  const email = formData.get('email')
  // 파일인 경우.
  if (typeof email !== 'string')
    return updateError(currentState, '올바른 이메일을 적어주세요')

  const { data, response } = await getAccountInfo(email)
  let loginType: 'password' | 'email' | 'regist'| null  =null

  if (response.status === 200) {
    if (data.passwordExist) loginType = 'password'
    if (data.emailExist) loginType = 'email'
    if (!data.emailExist && !data.password) loginType = 'regist'
  }
  
  switch (loginType) {
    case 'email' || 'password': {
      if (loginType === 'email') {
        const { response } = await getAuthCode({ email })

        if (response.status !== 200)
          return updateError(currentState, '다시 시도해주세요')
      }
      return updateForm(currentState, {
        message: null,
        email,
        loginType,
      })
    }
    case 'regist': {
      return updateForm(currentState, {
        message: null,
        email,
        noAccount: true,
      })
    }
    default:
      return updateError(currentState, '에러가 발생했습니다. 다시 시도해주세요')
  }
}

// Password를 사용한 로그인
export async function loginWithPassword(
  currentState: LoginForm,
  formData: FormData,
) {
  const email = formData.get('email')
  if (typeof email !== 'string')
    return updateError(currentState, '오류가 발생했습니다. 다시 시도해 주세요')

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

      return updateForm(currentState, { message: null })
    }
  }

  return updateError(currentState, '오류가 발생했습니다. 다시 시도해 주세요')
}

// Email 인증을 사용한 로그인
export async function loginWithEmail(
  currentState: LoginForm,
  formData: FormData,
) {
  const email = formData.get('email') as string
  const code = formData.get('code') as string

  if (typeof email !== 'string')
    return updateError(currentState, '오류가 발생했습니다. 다시 시도해 주세요')
  if (typeof code !== 'string')
    return updateError(currentState, '오류가 발생했습니다. 다시 시도해 주세요')

  const res = await verifyAuthCode({ email, code })
  if (res.response.status === 200) {
    const { emailToken } = res.data
    const { data, response } = await loginEmailToken({
      email,
      emailToken,
      password: '',
    })
    if (response?.status === 200) {
      const cookieOptions = getCookieOption()
      cookies().set('access_token', data?.accessToken, cookieOptions)
      cookies().set('refresh_token', data?.refreshToken, cookieOptions)

      return updateForm(currentState, { message: null }) // 성공 시 메시지 없애기
    }
    return updateError(currentState, '오류가 발생했습니다.') // 에러 메시지 업데이트
  }

  return updateError(currentState, '코드 인증에 실패했습니다') // 코드 인증 실패 시 메시지
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
  const code = formData.get('code') as string
  const { emailToken, email } = currentState

  // 코드나 이메일 토큰이 없을 경우 인증 코드 요청
  if (!code && !emailToken) {
    const res = await getAuthCode({ email })
    if (res.response.status === 200) {
      return updateForm(currentState, { getCode: true })
    }
    return updateForm(currentState, { getCode: false })
  }

  // 인증 코드가 제공되었을 경우 인증 코드 확인
  if (code) {
    const res = await verifyAuthCode({ email, code })
    if (res.response.status === 200) {
      return updateForm(currentState, {
        code: null,
        message: null,
        emailToken: res.data.emailToken,
      })
    }
    return updateError(currentState, '잘못된 코드입니다')
  }

  // 이메일 토큰이 있을 경우 비밀번호 설정
  if (emailToken) {
    const password = formData.get('password') as string
    const password2 = formData.get('password2') as string

    // 비밀번호 확인 불일치
    if (password !== password2) {
      return updateError(currentState, '비밀번호 확인이 일치하지 않습니다.')
    }

    const res = await modifyPassword({ password, password2, emailToken })
    if (res.response.status === 200) {
      return updateForm(currentState, { success: true })
    }
  }

  // 에러 처리
  return updateError(currentState, '에러가 발생했습니다.')
}
