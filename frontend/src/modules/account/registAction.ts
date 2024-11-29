'use server'

import { RegistForm } from '@/types/account/type'
import {
  getAccountInfo,
  verifyAuthCode,
  getAuthCode,
  makeUser,
} from '@/lib/data'
import { updateError, updateForm } from '@/lib/utill/formUtils'

async function checkValidEmail(currentState: RegistForm, email: string) {
  const { data, response } = await getAccountInfo(email)

  // 에러 처리.
  if (response.status !== 200)
    return updateError(currentState, '에러가 발생했습니다.')
  if (data.emailExist)
    return updateError(currentState, '이미 존재하는 계정입니다')

  // 인증 코드 발송
  const { data: resData, response: resResponse } = await getAuthCode({ email })

  if (resResponse.status !== 200)
    return updateError(currentState, '에러가 발생했습니다.')

  // 다음 시퀀스로 업데이트
  return updateForm(currentState, { email, status: 'WAITING_VERIFICATION' })
}

async function checkAuthCode(currentState: RegistForm, code: string) {
  const { data, response } = await verifyAuthCode({
    email: currentState.email,
    code,
  })

  // 에러 처리
  if (response.status !== 200)
    return updateError(currentState, '에러가 발생했습니다.')

  // 성공 시 다음 시퀀스로 업데이트
  return updateForm(currentState, {
    emailToken: data.emailToken as string,
    status: 'AUTHENTICATED',
  })
}

async function registUser(currentState: RegistForm, formData: FormData) {
  const formInfo = {
    nickname: formData.get('nickname') as string,
    lastName: formData.get('lastName') as string,
    firstName: formData.get('firstName') as string,
    password: formData.get('password') as string,
    password2: formData.get('password2') as string,
  }
  const { email, emailToken } = currentState

  // 비밀번호 확인
  if (formInfo.password !== formInfo.password2)
    return updateError(currentState, 'Password 가 일치하지 않습니다.')

  // 회원가입 요청
  const { response } = await makeUser({
    ...formInfo,
    email,
    emailToken,
    imageUrl: '',
  })

  if (response?.status !== 200)
    return updateError(currentState, '에러가 발생했습니다.')

  return updateForm(currentState, {
    status: 'COMPLETED',
  })
}

export async function registActions(
  currentState: RegistForm,
  formData: FormData,
) {
  const email = formData.get('email') as string
  const code = formData.get('code') as string

  switch (currentState.status) {
    case 'INPUT_EMAIL':
      return checkValidEmail(currentState, email)
    case 'WAITING_VERIFICATION':
      return checkAuthCode(currentState, code)
    case 'AUTHENTICATED':
      return registUser(currentState, formData)
    default:
      return updateError(
        currentState,
        '오류가 발생했습니다. 다시 시도해주세요.',
      )
  }
}
