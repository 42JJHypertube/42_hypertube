'use client'

import { LoginForm } from '@/types/account/type'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import Input from '@/modules/common/components/input'
import { validEmail } from '../../action'

function TypeEmail({
  loginForm,
  setLoginForm,
}: {
  loginForm: LoginForm
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>
}) {
  const [form, action] = useFormState(validEmail, loginForm)
  useEffect(() => {
    setLoginForm(form)
  }, [form])
  return (
    <>
      <form action={action}>
        <Input name="email" type="email" required />
        <button type="submit"> Submit </button>
      </form>
      <span>{form.message}</span>
    </>
  )
}

export default TypeEmail
