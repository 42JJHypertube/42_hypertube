'use client'

import { AuthForm, LoginForm } from '@/types/account/type'
import styles from './index.module.scss'
import Input from '@/modules/common/components/input'
import { useFormState } from 'react-dom'
import FormButton from '@/modules/common/components/formButton'

const loginInitial: LoginForm = {
  email: null,
  loginType: null,
  password: null,
  emailToken: null,
  message: null,
}

const authInitial: AuthForm = {
  email: null,
  emailToken: null,
  code: null,
  message: null,
  codeSended: false,
}

function loginTypeInput(type: string | null) {
  if (type == 'password') return <Input name="password" type="password" />
  return null
}

function LoginTemplate() {
  const [authForm, authAction] = useFormState(() => authInitial, authInitial)
  const [loginForm, loginAction] = useFormState(
    () => loginInitial,
    loginInitial,
  )

  return (
    <div className={styles.TypeAuthContainer}>
      <form className={styles.TypeAuthForm} action={loginAction}>
        <Input
          name="email"
          type="email"
          readOnly={loginForm.loginType ? true : false}
          required
        />
        {loginTypeInput(loginForm.loginType)}
        {loginForm.loginType === 'password' ? (
          <Input name="password" type="password" />
        ) : null}
        <span className={styles.infoMessage}> {loginForm.message}</span>
        <FormButton type="submit" content="계속하기" positive />
      </form>
      {loginForm.loginType === 'email' ? (
        <form action={authForm.emailToken ? loginAction : authAction}>
          <input
            name="email"
            type="text"
            style={{ display: 'none' } as any}
            value={loginForm.email!}
          />
          {authForm.codeSended ? (
            <Input name="code" type="text" required />
          ) : null}
          <FormButton
            type="submit"
            content={authForm.codeSended ? '계속하기' : '인증코드 요청'}
            positive
          />
        </form>
      ) : null}
    </div>
  )
}

export default LoginTemplate
