'use server'

import {
  changeProfile,
  getAuthCode,
  modifyPassword,
  verifyAuthCode,
} from '@/lib/data'
import { updateError, updateForm } from '@/lib/utill/formUtils'

export async function setProfile(
  currentState: { message: string | null; profileImage: Blob | null },
  formData: FormData,
) {
  const profileImage = formData.get('file') as File
  console.log(profileImage)
  if (profileImage) {
    const res = await changeProfile(formData)
    console.log(res)
    if (res.response.status !== 200)
      return {
        profileImage: currentState.profileImage,
        message: '제출에 실패했습니다.',
      }
    return {
      profileImage: null,
      message: '제출에 성공했습니다',
    }
  }

  return {
    profileImage: currentState.profileImage,
    message: '알맞은 이미지를 넣어주세요',
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
