'use client'

import Input from '@/modules/common/components/input'
import styles from './index.module.scss'
import FormButton from '@/modules/common/components/formButton'
import { useFormState } from 'react-dom'
import { LoginViewEnum, AuthForm, RegistForm } from '@/types/account/type'
import { registUser, requestRegistAuthCode } from '../../action2'
import React, { Dispatch, SetStateAction } from 'react';

const authInitial: AuthForm = {
  email: null,
  emailToken: null,
  code: null,
  message: null,
  codeSended: false,
}

const registInitial: RegistForm = {
  nickname: "",
  email: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: "",
  imageUrl: "",
  emailToken: "",
  message: null,
  success: false,
}

function RegisterTemplate({setCurrentView} : {setCurrentView: Dispatch<SetStateAction<LoginViewEnum>>}) {
  const [authForm, authAction] = useFormState(requestRegistAuthCode, authInitial)
  const [registForm, registAction] = useFormState(registUser, registInitial)
  
  return (
      <div className={styles.registContainer}>
        {registForm.success ? <div>
          <div> 회원 가입에 성공했습니다 !</div>
          <div className={styles.redirect}> 로그인 후 이용해보세요 ! <a className={styles.aTag} onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}>로그인으로 이동</a></div>
          </div> : <> 
        {authForm.emailToken === null ? 
          <form className={styles.inputContainer} action={authAction}>
            <Input
              name="email"
              type="email"
              readOnly={authForm.codeSended ? true : false}
              required
            />
            {authForm.codeSended ? (
              <>
              <div> 위의 메일로 인증코드가 전송되었습니다 ! </div>
              <Input name="code" type="text" required/>
              </>
            ) : null}
            <span className={styles.infoMessage}> {authForm.message} </span>
            <FormButton type="submit" content="계속하기" positive />
          </form>
          :
          <form className={styles.inputContainer} action={registAction}>
            <input className={styles.hidden}
              name="email"
              type="email"
              value={authForm.email!}
              readOnly
            />
            <input name="emailToken" type="text" readOnly className={styles.hidden} value={authForm.emailToken!}/>
            <Input name="nickname" required />
            <Input name="firstName" required />
            <Input name="lastName" required />
            <Input name="password" type="password" required />
            <Input name="password2" type="password" required />
            <span className={styles.infoMessage}> {registForm.message} </span>
            <FormButton type="submit" content="계속하기" positive />
          </form>
          }
      <div className={styles.redirect}> 이미 계정이 있으신가요? <a className={styles.aTag} onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}>로그인</a></div>
      </>} 
    </div>
  )
}

export default RegisterTemplate
