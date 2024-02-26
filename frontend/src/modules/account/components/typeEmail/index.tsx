'use client'

import { AuthForm } from '@/types/account/type'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import Input from '@/modules/common/components/input'
import { validEmail } from '../../action'
import styles from './index.module.scss'

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
    <div className={styles.TypeEmailContainer}>
      <h2>{form.state.includes('regist') ? 'Register' : 'Log In'}</h2>
      <form className={styles.TypeEmailForm} action={action}>
        <Input name="email" type="email" required />
        {form.message ? (
          <span className={styles.span}>{form.message}</span>
        ) : null}
        <button className={styles.TypeEmailButton} type="submit">
          {' '}
          Submit{' '}
        </button>
      </form>
    </div>
  )
}

export default TypeEmail
