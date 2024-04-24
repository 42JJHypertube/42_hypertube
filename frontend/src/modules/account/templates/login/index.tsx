'use client'

import { AuthForm, LoginForm } from '@/types/account/type'
import styles from './index.module.scss'
import Input from '@/modules/common/components/input'
import { useFormState } from 'react-dom'
import FormButton from '@/modules/common/components/formButton'
import { login, loginWithEmail } from '../../action2'

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

function LoginTemplate() {
  const [authForm, authAction] = useFormState(loginWithEmail, authInitial)
  const [loginForm, loginAction] = useFormState(login, loginInitial)

  return (

    <div className={styles.accountContainer}>
      <div className={styles.information}>
        <div className={styles.bigInfo}>Hyper Tube에 오신걸 환영합니다</div>
        <div className={styles.smallInfo}>모든 영화인들을 위한 HyperTube 회원 커뮤니티에 오신 것을 환영합니다. 로그인을 완료하고 모험을 시작하세요.</div>
      </div>
      <div className={styles.rightSide}>
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
      <div className={styles.redirect}> 아직 멤버가 아니신가요? <a className={styles.aTag}>회원가입</a></div>    
    </div>
    </div>
  )
}

export default LoginTemplate
