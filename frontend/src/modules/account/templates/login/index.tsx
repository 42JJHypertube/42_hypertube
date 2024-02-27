'use client'

import { useState } from 'react'
import { AuthForm } from '@/types/account/type'
import TypeAuth from '../../components/typeAuth'
import TypeEmail from '../../components/typeEmail'
import styles from './index.module.scss'

function viewSelector({
  form,
  setForm,
}: {
  form: AuthForm
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>
}) {
  switch (form.state) {
    case 'login-email':
      return <TypeEmail form={form} setForm={setForm} />
    case 'login-code':
    case 'login-password':
      return <TypeAuth form={form} setForm={setForm} />
    default:
      return null
  }
}

const initialState: AuthForm = {
  state: 'login-email',
  nickname: '',
  email: '',
  password: '',
  password2: '',
  firstName: '',
  lastName: '',
  imageUrl: '',
  emailToken: '',
  code: '',
  message: null,
}

function LoginTemplate() {
  const [form, setForm] = useState<AuthForm>(initialState)

  return (
    <div className={styles.LoginTemplateContainer}>
      {viewSelector({ form, setForm })}
    </div>
  )
}

export default LoginTemplate
