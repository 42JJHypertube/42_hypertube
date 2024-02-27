'use client'

import { AuthForm } from '@/types/account/type'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Input from '@/modules/common/components/input'
import FormButton from '@/modules/common/components/formButton'
import { loginByEmail, loginByPassword, verifyCode } from '../../action'
import styles from './index.module.scss'

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
    <div className={styles.TypeAuthContainer}>
      <form className={styles.TypeAuthForm} action={action}>
        <Input name="email" type="email" value={form.email} readOnly />
        {form.state === 'login-password' ? null : (
          <span className={styles.infoMessage}>
            {' '}
            위의 메일로 인증코드가 발송 되었습니다.{' '}
          </span>
        )}
        <Input
          name={form.state === 'login-password' ? 'password' : 'code'}
          type={form.state === 'login-password' ? 'password' : 'text'}
          required
        />
        <span className={styles.infoMessage}> {curForm.message}</span>
        <FormButton type="submit" content="인증 후 계속하기" positive />
      </form>
    </div>
  )
}

export default TypeAuth
