'use client'

import { LoginForm } from '@/types/account/type'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Input from '@/modules/common/components/input'
import { loginByAuth } from '../../action'

function TypeAuth({
  loginForm,
  setLoginForm,
}: {
  loginForm: LoginForm
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>
}) {
  const [form, action] = useFormState(loginByAuth, loginForm)
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
    </>
  )
}

export default TypeAuth
