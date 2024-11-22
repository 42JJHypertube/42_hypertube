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
import getCookieOption from '@/lib/utill/cookieOption'
import { AuthForm, LoginForm, RegistForm } from '@/types/account/type'
import { cookies } from 'next/headers'


// 리 렌더링을 유발할 필요가없고, 기존의 객체를 수정하는것이 원하는 동작이기 때문에 Object.assign 을 사용한다.
// 폼 관리용 함수.
function updateForm<T extends object>(currentState: T, updates: Partial<T>): T {
  return Object.assign(currentState, updates)
}

// 에러 관리용 함수.
function updateError<T extends { message: string | null }> (
  currentState: T,
  message: string | null,
): T {
  return Object.assign(currentState, { message })
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


// login 시 계정의 인증방식이 password인지 email인지 구별해주는 함수.
// email 일 경우 email을 통한 인증 후 로그인을 유도
// password 일 경우 password를 통한 로그인을 유도
// 계정이 없을 시 error message 반환 -> 이후에 자동으로 가입페이지로 이동 할 수 있도록 수정
async function getLoginType( email: string, currentState:LoginForm ) {
  const { data, response } = await checkEmail(email)
  let loginType = '';

  if (response.status === 200) {
    if (data.passwordExist)  loginType =  'password'  
    if (data.emailExist) loginType = 'eamil'
    if (!data.emailExist && !data.password) loginType = 'regist'
  }

  switch (loginType) {
    case 'email' || 'password' || 'regist': {
      if (loginType === 'email') {
        const { data, response } = await getAuthCode({ email })
        console.log(data);
        if (response.status !== 200)
          return updateError(currentState, '다시 시도해주세요')
      }
      return updateForm(currentState, {
        message: null,
        email,
        loginType
      })
    }
    default:
      return updateError(
        currentState,
        '에러가 발생했습니다. 다시 시도해주세요',
      )
  }  
}

export async function login(currentState: LoginForm, formData: FormData) {
  const email = formData.get('email') as string

  // 로그인 방식 판별
  if (currentState.loginType === null) 
    return getLoginType(email, currentState)

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

      return updateForm(currentState, {message : null})
    }
  }
  
  return updateError(currentState, '오류가 발생했습니다. 다시 시도해 주세요')
}

export async function loginWithEmail(
  currentState: AuthForm,
  formData: FormData,
) {
  const email = formData.get('email') as string
  const code = formData.get('code') as string

  const res = await veriftyAuthCode({ email, code })
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

// 마음에안듬.
export async function requestRegistAuthCode(
  currentState: AuthForm,
  formData: FormData,
) {
  const email = formData.get('email') as string
  const code = formData.get('code') as string

  // 코드가 존재하면 인증 코드 확인
  if (code) {
    const res = await veriftyAuthCode({ email, code })
    if (res.response.status === 200) {
      return updateForm(currentState, {
        email,
        codeSended: true,
        emailToken: res.data.emailToken as string,
        message: null, // 인증 성공 시 메시지 초기화
      })
    }

    return updateError(currentState, '인증 중 에러가 발생했습니다.')
  }

  // 이메일 확인
  const { data, response } = await checkEmail(email)
  if (response.status !== 200) {
    return updateError(currentState, '에러가 발생했습니다.')
  }

  // 이미 존재하는 계정인 경우
  if (data.emailExist) {
    return updateError(currentState, '이미 존재하는 계정입니다!')
  }

  // 인증 코드 발송
  const res = await getAuthCode({ email })
  if (res.response.status === 200) {
    console.log(res.data)
    return updateForm(currentState, {
      email,
      codeSended: true,
      message: null, // 코드 발송 성공 시 메시지 초기화
    })
  }

  return updateError(currentState, '오류가 발생했습니다. 다시 시도해주세요')
}

export async function registUser(currentState: RegistForm, formData: FormData) {
  const formInfo = {
    nickname: formData.get('nickname') as string,
    lastName: formData.get('lastName') as string,
    firstName: formData.get('firstName') as string,
    password: formData.get('password') as string,
    password2: formData.get('password2') as string,
  }

  // 비밀번호 확인
  if (formInfo.password !== formInfo.password2) {
    return updateError(currentState, 'Confirm Password 가 일치하지 않습니다.')
  }

  const email = formData.get('email') as string
  const emailToken = formData.get('emailToken') as string

  // 회원가입 요청
  const { response } = await makeUser({
    ...formInfo,
    email,
    emailToken,
    imageUrl: '',
  })

  // 성공 시
  if (response?.status === 200) {
    return updateForm(currentState, {
      success: true,
      message: '회원가입에 성공했습니다',
    })
  }

  // 실패 시
  return updateError(currentState, '에러가 발생했습니다.')
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
    const res = await veriftyAuthCode({ email, code })
    if (res.response.status === 200) {
      return updateForm(currentState, { code: null, message: null, emailToken: res.data.emailToken })
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