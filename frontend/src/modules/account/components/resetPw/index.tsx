'use client'

import Input from '@/modules/common/components/input'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { AuthForm } from '@/types/account/type'
import FormButton from '@/modules/common/components/formButton'
import { resetPassword } from '../../action'
import styles from './index.module.scss'

function ResetPw({
  form,
  setForm,
}: {
  form: AuthForm
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>
}) {
  const [curForm, action] = useFormState(resetPassword, form)
  useEffect(() => {
    setForm(curForm)
  }, [curForm])

  return (
    <div className={styles.resetPwContainer}>
      <form className={styles.resetPwForm} action={action}>
        <Input type="password" name="password" required />
        <Input type="password" name="password2" required />
        <span className={styles.infoMessage}>{form.message}</span>
        <FormButton type="submit" positive content="비밀번호 재설정 하기" />
      </form>
    </div>
  )
}

export default ResetPw
