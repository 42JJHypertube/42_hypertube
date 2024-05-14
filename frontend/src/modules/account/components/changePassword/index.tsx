'use client'

import { useFormState } from 'react-dom'
import FormButton from '@/modules/common/components/formButton'
import Input from '@/modules/common/components/input'
import { setPassword } from '../../action2'
import ChangeInfo from '../changeInfo'

export type ChangePasswordForm = {
  code: null | string
  emailToken: null | string
  message: null | string
  email: string
  getCode: boolean
  success: boolean
}

export default function ChangePassword({ email }: { email: string }) {
  const initialForm: ChangePasswordForm = {
    code: null,
    emailToken: null,
    message: null,
    getCode: false,
    success: false,
    email,
  }

  const [curForm, action] = useFormState(setPassword, initialForm)

  return (
    <form action={action}>
      <ChangeInfo label="Password" currentInfo="change or set password">
        <div>
          {curForm.emailToken ? (
            <div>
              <Input name="password" type="password" />
              <Input name="password2" type="password" />
              <FormButton type="submit" content="변경하기" positive />
            </div>
          ) : (
            <div>
              <p> 2차 인증이 필요합니다 </p>
              {curForm.getCode ? (
                <div>
                  <Input name="code" type="text" />
                  <FormButton type="submit" content="코드 인증" positive />
                </div>
              ) : (
                <FormButton
                  type="submit"
                  content="인증코드 받아오기"
                  positive
                />
              )}
            </div>
          )}
          <span>
            {' '}
            {curForm.message && !curForm.success ? curForm.message : null}
          </span>
          <span>
            {' '}
            {curForm.success ? '비밀번호가 설정 되었습니다 !' : null}
          </span>
        </div>
      </ChangeInfo>
    </form>
  )
}
