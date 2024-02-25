'use client'

import { AuthForm } from '@/types/account/type'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import Input from '@/modules/common/components/input'
import { validEmail } from '../../action'

function TypeEmail({
  form,
  setForm,
}: {
  form: AuthForm
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>
}) {
  const [curForm, action] = useFormState(validEmail, form)
  useEffect(() => {
    setForm(curForm)
  }, [curForm])
  return (
    <>
      <form action={action}>
        <Input name="email" type="email" required />
        <button type="submit"> Submit </button>
      </form>
      {form.message ? <span>{form.message}</span> : null}
    </>
  )
}

export default TypeEmail
