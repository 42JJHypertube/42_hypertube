'use client'

import Input from '@/modules/common/components/input'
import styles from './index.module.scss'
import FormButton from '@/modules/common/components/formButton'
import { useFormState } from 'react-dom'
import { LoginViewEnum, AuthForm, RegistForm } from '@/types/account/type'
import {
  registUser,
  requestAuthCode,
  requestRegistAuthCode,
} from '../../action2'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import InnerInputButton from '@/modules/common/components/innerInputButton'

const authInitial: AuthForm = {
  email: null,
  emailToken: null,
  message: null,
  codeSended: false,
}

const registInitial: RegistForm = {
  email: '',
  emailToken: '',
  message: null,
  success: false,
}

function RegisterTemplate({
  setCurrentView,
  setEmail,
  email,
}: {
  setCurrentView: Dispatch<SetStateAction<LoginViewEnum>>
  setEmail: Dispatch<React.SetStateAction<string>>
  email?: string
}) {
  const [authForm, authAction] = useFormState(
    requestRegistAuthCode,
    authInitial,
  )
  const [registForm, registAction] = useFormState(registUser, registInitial)
  const [inputEmail, setInputEmail] = useState<string>(email ? email : '')
  const [codeSended, setCodeSended] = useState(false)

  async function getAuthCode(email: string) {
    const res = await requestAuthCode(email)
    if (res.success) {
      setCodeSended(true)
    } else {
      setCodeSended(false)
    }
  }

  // unmount할 때 authForm.codeSeneded를 초기화 하지않으면, 다시 화면을 전환했을 때 이전의 진행상황이 그대로 남아있음. 왤까?
  useEffect(() => {
    if (inputEmail != '')
      getAuthCode(inputEmail)
  }, [])

  useEffect(() => {
    if (authForm.codeSended){
      setCodeSended(true)
      authForm.codeSended = false
      authForm.message = null
    }
  }, [authForm])

  return (
    <div className={styles.registContainer}>
      {registForm.success ? (
        <div>
          <div> 회원 가입에 성공했습니다 !</div>
          <div className={styles.redirect}>
            {' '}
            로그인 후 이용해보세요 !{' '}
            <a
              className={styles.aTag}
              onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}
            >
              로그인으로 이동
            </a>
          </div>
        </div>
      ) : (
        <>
          {authForm.emailToken === null ? (
            <form className={styles.inputContainer} action={authAction}>
              <Input
                name="email"
                type="email"
                onChange={(e) => {
                  setInputEmail(e.target.value)
                }}
                value={inputEmail}
                readOnly={codeSended ? true : false}
                innerButton={
                  codeSended ? (
                    <InnerInputButton
                      title="수정"
                      onClick={() => {
                        setCodeSended(false)
                      }}
                    />
                  ) : null
                }
                required
              />
              {codeSended ? (
                <>
                  <div> 위의 메일로 인증코드가 전송되었습니다 ! </div>
                  <Input
                    name="code"
                    type="text"
                    required
                    innerButton={
                      <InnerInputButton
                        title="코드 재 전송"
                        onClick={() => {requestAuthCode(inputEmail)}}
                      />
                    }
                  />
                  <span className={styles.infoMessage}> {authForm.message} </span>
                </>
              ) : null}
              <FormButton type="submit" content="계속하기" positive />
            </form>
          ) : (
            <form className={styles.inputContainer} action={registAction}>
              <input
                className={styles.hidden}
                name="email"
                type="email"
                value={authForm.email!}
                readOnly
              />
              <input
                name="emailToken"
                type="text"
                readOnly
                className={styles.hidden}
                value={authForm.emailToken!}
              />
              <Input name="nickname" required />
              <Input name="firstName" required />
              <Input name="lastName" required />
              <Input name="password" type="password" required />
              <Input name="password2" type="password" required />
              <span className={styles.infoMessage}> {registForm.message} </span>
              <FormButton type="submit" content="계속하기" positive />
            </form>
          )}
          <div className={styles.redirect}>
            {' '}
            이미 계정이 있으신가요?{' '}
            <a
              className={styles.aTag}
              onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}
            >
              로그인
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default RegisterTemplate
