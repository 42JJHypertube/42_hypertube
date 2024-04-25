'use client'

import Input from '@/modules/common/components/input'
import styles from './index.module.scss'
import FormButton from '@/modules/common/components/formButton'
import { useFormState } from 'react-dom'
import { LoginViewEnum } from '@/types/account/type'

function RegisterTemplate({setCurrentView} : {setCurrentView: Dispatch<SetStateAction<LoginViewEnum>>}) {

  const [authForm, authAction] = useFormState(() => ({}), {})
  const [loginForm, loginAction] = useFormState(()=> ({loginType: 'email'}), {loginType: 'email'})
  
  return (
      <div className={styles.registContainer}>
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
        <span className={styles.infoMessage}> {null} </span>
        <FormButton type="submit" content="계속하기" positive />
      </form>
      <div className={styles.redirect}> 이미 계정이 있으신가요? <a className={styles.aTag} onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}>로그인</a></div>    
    </div>
  )
}

export default RegisterTemplate
