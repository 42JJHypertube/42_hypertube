import { useState } from 'react'
import styles from './index.module.scss'
import Input from '@/modules/common/components/input'
import InnerInputButton from '@/modules/common/components/innerInputButton'
import FormButton from '@/modules/common/components/formButton'
import useLoginForm from '@/lib/hooks/useLoginForm'
import LoginAuth from '../loginAuth'

const LoginMain = () => {
  const { email, loginType, message, resetFormState, loginAction } =
    useLoginForm()
  const [emailInput, setEmailInput] = useState('')

  return (
    <form className={styles.inputContainer} action={loginAction}>
      <Input
        name="email"
        type="email"
        value={loginType ? (email ? email : '') : emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        readOnly={!!loginType}
        innerButton={
          loginType && (
            <InnerInputButton title="수정" onClick={resetFormState} />
          )
        }
        required
      />
      {loginType && <LoginAuth email={email!} loginType={loginType} message={message}/>}
      <span className={styles.errorMessage}>{message}</span>
      <FormButton
        type="submit"
        content="계속하기"
        positive
      />
    </form>
  )
}

export default LoginMain
