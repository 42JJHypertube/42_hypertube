'use client'

import { AuthForm } from '@/types/account/type'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Input from '@/modules/common/components/input'
import { loginByEmail, loginByPassword, verifyCode } from '../../action'

function getLogin(type: string) {
  switch (type) {
    case 'login-password':
      return loginByPassword
    case 'login-code':
      return loginByEmail
    case 'regist-auth':
      return verifyCode
    default:
      return loginByEmail
  }
}

// login -> 비밀번호를 쓰는경우, 이메일 코드를 쓰는 경우
// regist -> 새로운 이메일의 아이디를 인증하기 위해서
function TypeAuth({
  form,
  setForm,
}: {
  form: AuthForm
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>
}) {
  const Action = getLogin(form.state)
  const [curForm, action] = useFormState(Action, form)
  useEffect(() => {
    setForm(curForm)
  }, [curForm])
  return (
    <>
      <span> {curForm.email} </span>
      <form action={action}>
        <Input
          name={form.state === 'login-password' ? 'password' : 'code'}
          type={form.state === 'login-password' ? 'password' : 'text'}
          required
        />
        <button type="submit"> Submit </button>
      </form>
      <span> {curForm.message}</span>
      <button
        type="button"
        onClick={() => setForm({ ...form, state: 'login-email' })}
      >
        Go Back
      </button>
    </>
  )
}

export default TypeAuth
