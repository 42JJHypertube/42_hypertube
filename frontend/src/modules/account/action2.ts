'use server'

import { checkEmail, getAuthCode, loginEmailToken, loginPassword, veriftyAuthCode } from '@/lib/data'
import { getCookieOption } from '@/lib/utill/cookieOption'
import { AuthForm, LoginForm } from '@/types/account/type'
import { cookies } from 'next/headers'

// login 시 계정의 인증방식이 password인지 email인지 구별해주는 함수.
// 계정이 없을 시 error message 반환 -> 이후에 자동으로 가입페이지로 이동 할 수 있도록 수정
async function checkLoginType({
  email,
  currentState,
}: {
  email: string
  currentState: LoginForm
}) {
  const { data, response } = await checkEmail(email)
  if (response.status === 200) {
    if (data.passwordExist)
      return {
        ...currentState,
        email,
        loginType: 'password',
      } as LoginForm
    if (data.emailExist)
      return {
        ...currentState,
        email,
        loginType: 'email',
      } as LoginForm
  }
  return {
    ...currentState,
    message: '존재하지 않는 계정입니다.',
  } as LoginForm
}

export async function login(currentState: LoginForm, formData: FormData) {
  const email = formData.get('email') as string

  // 로그인 방식 판별
  if (currentState.loginType === null)
    return await checkLoginType({ email, currentState })

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

      return currentState
    }
  }

  return {
    ...currentState,
    message: '오류가 발생했습니다. 다시 시도해 주세요',
  }
}

export async function loginWithEmail (currentState: AuthForm, formData: FormData) {
  // 코드가 아직 보내지지 않았을 때
  if (!currentState.codeSended)
    return await requestAuthCode(currentState, formData)

  // 코드가 보내졌을 때
  const email = formData.get('email') as string
  const code = formData.get('code') as string
  const res = await veriftyAuthCode({email, code})
  
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
        message: "오류가 발생했습니다."
      }
  }
  return {
    ...currentState,
    message: "코드 인증에 실패했습니다" 
  }
}

async function requestAuthCode (currentState: AuthForm, formData: FormData) {
  const email = formData.get('email') as string
  const { data, response } = await getAuthCode({ email })
  if (response.status === 200){
    console.log(data)
    return {
      ...currentState,
      codeSended: true
    } as AuthForm
  }

  return {
    ...currentState,
    message: "오류가 발생했습니다. 다시 시도해주세요"
  } as AuthForm
}