'use client'
import { resetPassword } from '../../action'
import useToggleState from '@/lib/hooks/useToggleState'
import FormButton from '@/modules/common/components/formButton'
import Input from '@/modules/common/components/input'
import { AuthForm, AuthSequence } from '@/types/account/type'
import { useFormState } from 'react-dom'
import ChangeInfo from '../changeInfo'

const initialForm: AuthForm = {
  state: 'resetPw-auth' as AuthSequence,
  nickname: '',
  email: '',
  password: '',
  password2: '',
  firstName: '',
  lastName: '',
  imageUrl: '',
  emailToken: '',
  code: '',
  message: null,
}

export default function ChangePassword(userInfo: any) {
  const [curForm, action] = useFormState(resetPassword, initialForm)

  return (
    <form action={action}>
      <ChangeInfo label="Password" currentInfo="change or set password">
        <div>
          <Input name="password" type="password" />
          <Input name="password2" type="password" />
          <span> {curForm.message ? curForm.message : null}</span>
          <FormButton
            type="submit"
            content={
              curForm.state === 'resetPw-auth' ? '인증하기' : '비밀번호 변경'
            }
            positive
          />
        </div>
      </ChangeInfo>
    </form>
  )
}
