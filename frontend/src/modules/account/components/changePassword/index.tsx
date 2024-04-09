'use client'
import { resetPassword, setPassword } from '../../action'
import FormButton from '@/modules/common/components/formButton'
import Input from '@/modules/common/components/input'
import { useFormState } from 'react-dom'
import ChangeInfo from '../changeInfo'
import { actionWrapper, getAuthCode } from '@/lib/data'
import { useState } from 'react'

export type changePasswordForm = {
  password: string
  password2: string
  code: null | string
  emailToken: null | string
  message: null | string
  email: string
  getCode: boolean
}

export default function ChangePassword({ email }: { email: string }) {
  const initialForm: changePasswordForm = {
    password: '',
    password2: '',
    code: null,
    emailToken: null,
    message: null,
    email: email,
    getCode: false,
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
          <span> {curForm.message ? curForm.message : null}</span>
        </div>
      </ChangeInfo>
    </form>
  )
}
