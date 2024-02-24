'use client'

import { useState } from 'react'
import { LoginForm } from '@/types/account/type'
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

const initialState: LoginForm = {
  email: '',
  auth: 'none',
  password: '',
  code: '',
  message: null,
}

function LoginTemplate() {
  const [loginForm, setLoginForm] = useState<LoginForm>(initialState)

  return <>{viewSelector({ loginForm, setLoginForm })}</>
}

export default LoginTemplate
