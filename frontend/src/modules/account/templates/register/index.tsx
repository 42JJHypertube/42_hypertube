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
  email: string
}) {
  const [authForm, authAction] = useFormState(
    requestRegistAuthCode,
    authInitial,
  )
  const [registForm, registAction] = useFormState(registUser, registInitial)
  const [inputEmail, setInputEmail] = useState<string>(email ? email : '')
  const [isCodeSended, setIsCodeSended] = useState(false)
  const [isAuthEmail, setIsAuthEmail] = useState<boolean>(false)
  const [isPending, setIsPending] = useState<boolean>(false)

  async function getAuthCode(email: string) {
    setIsPending(true)
    const res = await requestAuthCode(email)
    if (res.success) {
      setIsCodeSended(true)
    } else {
      setIsCodeSended(false)
    }
    setIsPending(false)
  }

  async function reRequesetAuth (email: string) {
    setIsPending(true);
    await requestAuthCode(email)
    setIsPending(false);
  }

  // 첫 렌더링시에 email이 존재한다면, 해당 email로 code전송
  useEffect(() => {
    if (email !== '') 
      getAuthCode(email)
    
    // unmount시 setEmail 초기화
    return () => {
      setEmail('')
    }
  }, [])

  // 수정 버튼 클릭시 초기화
  useEffect(() => {
    if (!isAuthEmail) {
      setIsCodeSended(false)
      authForm.email =  null,
      authForm.emailToken= null
      authForm.message= null
      authForm.codeSended= false
      registForm.email= ''
      registForm.emailToken= ''
      registForm.message= null
      registForm.success= false
    }
  }, [isAuthEmail])

  useEffect(() => {
    if (authForm.codeSended)
      setIsCodeSended(true)
    if (authForm.emailToken)
      setIsAuthEmail(true)
  }, [authForm])

  return (
    //회원 가입에 성공했을 때 보이는 화면 
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
        // 이메일을 입력 받는 화면
        <>
          {!isAuthEmail ? (
            <form className={styles.inputContainer} action={authAction}>
              <Input
                name="email"
                type="email"
                onChange={(e) => {
                  setInputEmail(e.target.value)
                }}
                value={inputEmail}
                readOnly={isCodeSended ? true : false}
                innerButton={
                  isCodeSended ? (
                    <InnerInputButton
                      title="수정"
                      onClick={() => {
                        setIsCodeSended(false)
                      }}
                    />
                  ) : null
                }
                required
              />
              {/* 이메일을 입력 후 인증 요청시 보이는 화면 */}
              {isCodeSended ? (
                <>
                  <div> 위의 메일로 인증코드가 전송되었습니다 ! </div>
                  <Input
                    name="code"
                    type="text"
                    error={authForm.message ? true : false}
                    required
                    innerButton={
                      <InnerInputButton
                        title="코드 재 전송"
                        pending={isPending}
                        onClick={() => {reRequesetAuth(inputEmail)}}
                      />
                    }
                  />
                </>
              ) : null}
              <FormButton isPending={isPending} type="submit" content="계속하기" positive />
              {authForm.message ? <span className={styles.errorMessage}> {"! " + authForm.message} </span> : null }
            </form>
          ) : (
            // 인증 완료 후 가입을 위한 info 작성 화면
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
              {registForm.message ? <span className={styles.errorMessage}> {"! " + registForm.message} </span> : null }
              <FormButton isPending={isPending} type="submit" content="계속하기" positive />
            </form>
          )}
          {/* 로그인 페이지로 이동하는 footer */}
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
