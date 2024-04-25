'use client'

import { AuthForm, LoginForm } from '@/types/account/type'
import styles from './index.module.scss'
import Input from '@/modules/common/components/input'
import { useFormState } from 'react-dom'
import FormButton from '@/modules/common/components/formButton'
import { login, loginWithEmail } from '../../action2'
import { LoginViewEnum } from '@/types/account/type'
import AccountNav from '../../components/nav'

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

function LoginTemplate({setCurrentView} = {setCurrentView : Dispatch<SetStateAction<LoginViewEnum>>}) {
  const [authForm, authAction] = useFormState(loginWithEmail, authInitial)
  const [loginForm, loginAction] = useFormState(login, loginInitial)

  return (
      <div className={styles.loginContainer}>
      {
      loginForm.loginType !== 'email' ?
      <form className={styles.inputContainer} action={loginAction}>
        <Input
          name="email"
          type="email"
          readOnly={loginForm.loginType ? true : false}
          required
        />
        {loginForm.loginType === 'password' ? (
          <Input name="password" type="password" />
        ) : null}
        <span className={styles.infoMessage}> {loginForm.message}</span>
        <FormButton type="submit" content="계속하기" positive />
      </form> : null 
      }
      {loginForm.loginType === 'email' ? (
        <form className={styles.inputContainer} action={authAction}>
          <Input
            name="email"
            type="text"
            value={loginForm.email!}
            readOnly
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
      <div className={styles.redirect}> 아직 멤버가 아니신가요? <a className={styles.aTag} onClick={() => setCurrentView(LoginViewEnum.REGISTER)}>회원가입</a></div>
      <AccountNav/>
    </div>
  )
}

export default LoginTemplate
