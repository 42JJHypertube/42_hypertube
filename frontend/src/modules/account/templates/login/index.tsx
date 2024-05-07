'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AuthForm, LoginForm } from '@/types/account/type'
import styles from './index.module.scss'
import Input from '@/modules/common/components/input'
import { useFormState } from 'react-dom'
import FormButton from '@/modules/common/components/formButton'
import { login, loginWithEmail, requestAuthCode } from '../../action2'
import { LoginViewEnum } from '@/types/account/type'
import AccountNav from '../../components/nav'
import InnerInputButton from '@/modules/common/components/innerInputButton'

const loginInitial: LoginForm = {
  email: null,
  loginType: null,
  message: null,
  noAccount: false,
}

const authInitial: AuthForm = {
  email: null,
  emailToken: null,
  message: null,
  codeSended: false,
}

function LoginTemplate({
  setCurrentView,
  setEmail,
}: {
  setCurrentView: Dispatch<SetStateAction<LoginViewEnum>>
  setEmail: Dispatch<React.SetStateAction<string>>
}) {
  const [authForm, authAction] = useFormState(loginWithEmail, authInitial)
  const [loginForm, loginAction] = useFormState(login, loginInitial)

  const [isAuthEmail, setIsAuthEmail] = useState<boolean>(false)
  const [isEmail, setIsEmail] = useState<boolean>(false)
  const [isPassword, setIsPassword] = useState<boolean>(false)
  const [isPending, setIsPending] = useState<boolean>(false)

  //loginForm에 따라서, 회원가입 페이지로 넘길지, 혹은 로그인 과정을 진행할지 판별하도록 한다.
  useEffect(() => {
    if (loginForm.noAccount) {
      setCurrentView(LoginViewEnum.REGISTER)
      loginForm.email && setEmail(loginForm.email)
    }
    if (loginForm.loginType === 'email') {
      setIsAuthEmail(true)
      setIsEmail(true)
    }
    if (loginForm.loginType === 'password') {
      setIsAuthEmail(true)
      setIsPassword(true)
    }
  }, [loginForm])

  // 이메일 인증이 초기화됐다 -> 인증전의 화면으로 돌아옴 -> 기존의 데이터들을 모두 초기화 해주는 행동이 필요함.
  useEffect(() => {
    if (!isAuthEmail) {
      loginForm.email = null
      loginForm.loginType = null
      loginForm.message = null
      loginForm.noAccount = false
      authForm.codeSended = false
      authForm.email = null
      authForm.emailToken = null
      authForm.message = null
    }
  }, [isAuthEmail])

  // email인증 코드를 다시 보내는 함수.
  async function reRequestAuth(email: string) {
    setIsPending(true)
    await requestAuthCode(email)
    setIsPending(false)
  }

  return (
    <div className={styles.loginContainer}>
      {!isEmail ? (
        <form className={styles.inputContainer} action={loginAction}>
          <Input
            name="email"
            type="email"
            readOnly={isAuthEmail ? true : false}
            innerButton={
              isAuthEmail ? (
                <InnerInputButton
                  title="수정"
                  onClick={() => {
                    setIsAuthEmail(false)
                    setIsPassword(false)
                  }}
                />
              ) : null
            }
            required
          />
          {isPassword ? (
            <Input
              name="password"
              type="password"
              error={loginForm.message ? true : false}
            />
          ) : null}
          {loginForm.message ? (
            <span className={styles.errorMessage}>
              {' '}
              {'! ' + loginForm.message}
            </span>
          ) : null}
          <FormButton
            isPending={isPending}
            type="submit"
            content="계속하기"
            positive
          />
        </form>
      ) : null}
      {isEmail ? (
        <form className={styles.inputContainer} action={authAction}>
          <Input
            name="email"
            type="text"
            value={loginForm.email!}
            readOnly
            innerButton={
              <InnerInputButton
                title="수정"
                onClick={() => {
                  setIsEmail(false)
                  setIsAuthEmail(false)
                }}
              />
            }
          />
          <Input
            name="code"
            type="text"
            error={authForm.message ? true : false}
            readOnly={isPending}
            required
            innerButton={
              <InnerInputButton
                pending={isPending}
                title="코드 재 전송"
                onClick={() => {
                  reRequestAuth(loginForm.email!)
                }}
              />
            }
          />
          {authForm.message ? (
            <span className={styles.errorMessage}>
              {' '}
              {'! ' + authForm.message}
            </span>
          ) : null}
          <FormButton
            isPending={isPending}
            type="submit"
            content={'계속하기'}
            positive
          />
        </form>
      ) : null}
      <div className={styles.redirect}>
        {' '}
        아직 멤버가 아니신가요?{' '}
        <a
          className={styles.aTag}
          onClick={() => {
            setCurrentView(LoginViewEnum.REGISTER)
          }}
        >
          회원가입
        </a>
      </div>
      <AccountNav />
    </div>
  )
}

export default LoginTemplate
