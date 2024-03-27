'use client'

import { AuthForm } from '@/types/account/type'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import Input from '@/modules/common/components/input'
import FormButton from '@/modules/common/components/formButton'
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
      <form className={styles.TypeEmailForm} action={action}>
        <Input name="email" type="email" required />
        {form.message ? (
          <span className={styles.infoMessage}>{form.message}</span>
        ) : null}
        <FormButton
          type="submit"
          content={
            form.state === 'regist-email'
              ? '이메일로 가입하기'
              : '이메일로 계속하기'
          }
          positive
        />
      </form>
    </div>
  )
}

export default TypeEmail
