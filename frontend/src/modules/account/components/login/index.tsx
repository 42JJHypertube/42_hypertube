'use client'

import Input from '@/modules/common/components/input'
import { useFormState } from 'react-dom'
import { LoginViewEnum } from '@/types/account/type'
import { validEmail, loginByEmail, loginByPw } from '../../action'

type Props = {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}

const initialState: {
  email: string | null
  auth: string | null
  message: string | null
} = {
  email: null,
  auth: null,
  message: null,
}

function Login({ setCurrentView }: Props) {
  const [checkForm, checkEmail] = useFormState(validEmail, initialState)
  const [emailForm, emailLogin] = useFormState(loginByEmail, initialState)
  const [pwForm, pwLogin] = useFormState(loginByPw, initialState)

  const getFormAction = (auth: string | null) => {
    switch (auth) {
      case 'email':
        return emailLogin
      case null:
        return checkEmail
      default:
        return pwLogin
    }
  }

  const getType = (auth: string | null) => {
    switch (auth) {
      case null:
        return 'email'
      case 'email':
        return 'code'
      default:
        return 'password'
    }
  }

  const getMessage = (auth: string | null) => {
    switch (auth) {
      case null:
        return checkForm.message
      case 'email':
        return emailForm.message
      default:
        return pwForm.message
    }
  }

  emailForm.email = checkForm.email
  pwForm.email = checkForm.email
  console.log(emailForm.email)
  console.log(pwForm.email)

  return (
    <>
      <form action={getFormAction(checkForm.auth)}>
        <Input
          name={getType(checkForm.auth)}
          type={getType(checkForm.auth)}
          required
        />
        <button type="submit"> Submit </button>
      </form>
      <span>{getMessage(checkForm.message)}</span>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}
      >
        go log in
      </button>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.FIND_PW)}
      >
        find pwd
      </button>
    </>
  )
}

export default Login
