'use client'

import { LoginForm } from '@/types/account/type'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Input from '@/modules/common/components/input'
import { loginByEmail, loginByPassword } from '../../action'

function getLogin(type: string) {
  switch (type) {
    case 'password':
      return loginByPassword
    case 'email':
      return loginByEmail
    default:
      return loginByEmail
  }
}
function TypeAuth({
  loginForm,
  setLoginForm,
}: {
  loginForm: LoginForm
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>
}) {
  const loginAction = getLogin(loginForm.auth)
  const [form, action] = useFormState(loginAction, loginForm)
  useEffect(() => {
    setLoginForm(form)
  }, [form])
  return (
    <>
      <span> {form.email} </span>
      <form action={action}>
        <Input
          name={form.auth === 'password' ? 'password' : 'code'}
          type={form.auth === 'password' ? 'password' : 'text'}
          required
        />
        <button type="submit"> Submit </button>
      </form>
      <span>{form.message}</span>
      <button
        type="button"
        onClick={() => setLoginForm({ ...loginForm, auth: 'none' })}
      >
        Go Back
      </button>
    </>
  )
}

export default TypeAuth
