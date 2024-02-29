'use server'

import {
  getAuthCode,
  veriftyAuthCode,
  makeUser,
  checkEmail,
  loginPassword,
  loginEmailToken,
  modifyPassword,
  getProfile,
} from '@/lib/data'
import { AuthForm, AuthSequence } from '@/types/account/type'
import { cookies } from 'next/headers'

export async function registUser(currentState: AuthForm, formData: FormData) {
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

  const { response } = await makeUser({
    ...formInfo,
    email: currentState.email,
    emailToken: currentState.emailToken,
    imageUrl: '',
  })

  console.log(response)

  if (response?.status === 200) {
    return {
      ...currentState,
      message: '회원가입에 성공했습니다',
    }
  }
  return {
    ...currentState,
    message: '에러가 발생했습니다.',
  }
}

export async function validEmail(currentState: AuthForm, formData: FormData) {
  const email = formData.get('email') as string
  const { data, response } = await checkEmail(email)

  let type
  if (currentState.state.includes('login-')) type = 'login'
  else if (currentState.state.includes('regist-')) type = 'regist'
  else type = 'resetPw'

  const defaultRes: AuthForm = {
    ...currentState,
    email,
  }
  console.log(email)
  console.log(data)
  // 이메일이 존재하고 패스워드가 설정되어있는 경우
  if (data?.emailExist && data?.passwordExist) {
    switch (type) {
      case 'regist':
        return {
          ...defaultRes,
          message: '이미 등록된 계정입니다.',
        }
      case 'login':
        return {
          ...defaultRes,
          state: 'login-password' as AuthSequence,
          message: null,
        }
      case 'resetPw': {
        const ret = await getAuthCode({ email })
        console.log(ret.data)
        return {
          ...defaultRes,
          state: 'resetPw-auth' as AuthSequence,
          message: null,
        }
      }
      default:
        return {
          ...defaultRes,
          message: 'state Error',
        }
    }
  }

  // 이메일은 존재하지만 패스워드가 설정되어 있지 않는 경우
  if (data?.emailExist) {
    switch (type) {
      case 'login': {
        const ret = await getAuthCode({ email })

        console.log(ret.data)
        if (ret?.response.status === 200)
          return {
            ...defaultRes,
            state: 'login-code' as AuthSequence,
            message: null,
          }

        return {
          ...defaultRes,
          message: '에러가 발생했습니다. 다시 시도해주세요',
        }
      }
      case 'regist':
        return {
          ...defaultRes,
          state: 'regist-auth' as AuthSequence,
          message: null,
        }
      case 'resetPw': {
        const ret = await getAuthCode({ email })
        console.log(ret.data)

        if (ret?.response.status === 200)
          return {
            ...defaultRes,
            state: 'resetPw-auth' as AuthSequence,
            message: null,
          }
        return {
          ...defaultRes,
          message: '에러가 발생했습니다. 다시 시도해주세요',
        }
      }
      default:
        return {
          ...defaultRes,
          message: 'state Error',
        }
    }
  }

  // 성공했지만, 위의 경우에 안걸린 경우 -> 아이디가 존재하지않음
  if (response?.status === 200) {
    switch (type) {
      case 'login':
        return {
          ...defaultRes,
          message: '존재하지 않는 아이디 입니다.',
        }
      case 'regist': {
        const ret = await getAuthCode({ email })
        console.log(ret.data)
        if (ret?.response.status === 200)
          return {
            ...defaultRes,
            state: 'regist-auth' as AuthSequence,
            message: null,
          }

        return {
          ...defaultRes,
          message: '인증 코드 발송중 에러가 발생했습니다',
        }
      }
      case 'resetPw':
        return {
          ...defaultRes,
          message: '존재하지 않는 아이디 입니다.',
        }
      default:
        return {
          ...defaultRes,
          message: 'State Error',
        }
    }
  }

  // 위의 경우에 전부 걸리지않았다 -> 에러 발생
  return {
    ...defaultRes,
    message: '에러가 발생했습니다.',
  }
}

export async function loginByPassword(
  currentState: AuthForm,
  formData: FormData,
) {
  const defaultRes: AuthForm = {
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

export async function loginByEmail(currentState: AuthForm, formData: FormData) {
  const defaultRes: AuthForm = {
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
        secure: true,
      })
      cookies().set('refresh_token', data?.refreshToken, {
        httpOnly: true,
        secure: true,
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

export async function verifyCode(currentState: AuthForm, formData: FormData) {
  const email = currentState.email as string
  const code = formData.get('code') as string
  const { data, response } = await veriftyAuthCode({ email, code })

  let type
  if (currentState.state.includes('regist')) type = 'regist'
  else if (currentState.state.includes('resetPw')) type = 'resetPw'

  if (response.status === 200) {
    switch (type) {
      case 'regist':
        return {
          ...currentState,
          state: 'regist-form' as AuthSequence,
          emailToken: data.emailToken,
          message: null,
        }
      case 'resetPw':
        return {
          ...currentState,
          state: 'resetPw-setPw' as AuthSequence,
          emailToken: data.emailToken,
          message: null,
        }
    }
  }

  return {
    ...currentState,
    message: '코드 인증중 에러가 발생했습니다.',
  }
}

export async function resetPassword(
  currentState: AuthForm,
  formData: FormData,
) {
  const password = formData.get('password') as string
  const password2 = formData.get('password2') as string
  const emailToken = currentState.emailToken

  console.log('reset PW')
  const defaultRes = {
    ...currentState,
  }
  if (password !== password2) {
    return {
      ...defaultRes,
      message: '비밀번호 확인이 일치하지 않습니다',
    }
  }
  const { data, response } = await modifyPassword({
    password,
    password2,
    emailToken,
  })

  console.log(data)
  console.log(response)
  if (response.status === 200) {
    return {
      ...defaultRes,
      message: '설정이 완료되었습니다',
    }
  }

  return {
    ...defaultRes,
    message: '에러가 발생했습니다.',
  }
}

export async function checkLogin() {
  try {
    const { data, response } = await getProfile()
    return true
  } catch {
    return false
  }
}
