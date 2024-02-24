'use client'

import { useState } from 'react'
import { LoginForm, LoginViewEnum } from '@/types/account/type'
import TypeAuth from '../components/login/typeAuth'
import TypeEmail from '../components/login/typeEmail'

function viewSelector({
  loginForm,
  setLoginForm,
}: {
  loginForm: LoginForm
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>
}) {
  switch (loginForm.auth) {
    case 'none':
      return <TypeEmail loginForm={loginForm} setLoginForm={setLoginForm} />
    case 'email':
      return <TypeAuth loginForm={loginForm} setLoginForm={setLoginForm} />
    case 'password':
      return <TypeAuth loginForm={loginForm} setLoginForm={setLoginForm} />
    default:
      return null
  }
}

type Props = {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}

const initialState: LoginForm = {
  email: '',
  auth: 'none',
  password: '',
  code: '',
  message: null,
}

function LoginTemplate({ setCurrentView }: Props) {
  const [loginForm, setLoginForm] = useState<LoginForm>(initialState)

  return (
    <>
      {viewSelector({ loginForm, setLoginForm })}
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}
      >
        go log in
      </button>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.REGISTER)}
      >
        go register
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

export default LoginTemplate
