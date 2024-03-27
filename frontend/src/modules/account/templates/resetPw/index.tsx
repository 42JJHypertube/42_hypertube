'use client'

import { useState } from 'react'
import { AuthForm, AuthSequence } from '@/types/account/type'
import TypeAuth from '../../components/typeAuth'
import TypeEmail from '../../components/typeEmail'
import styles from './index.module.scss'
import ResetPw from '../../components/resetPw'

function viewSelector({
  form,
  setForm,
}: {
  form: AuthForm
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>
}) {
  switch (form.state) {
    case 'resetPw-email':
      return <TypeEmail form={form} setForm={setForm} />
    case 'resetPw-auth':
      return <TypeAuth form={form} setForm={setForm} />
    case 'resetPw-setPw':
      return <ResetPw form={form} setForm={setForm} />
    default:
      return null
  }
}

const initialState: AuthForm = {
  state: 'resetPw-email' as AuthSequence,
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

function ResetPwTemplate() {
  const [form, setForm] = useState<AuthForm>(initialState)

  return (
    <div className={styles.resetPwTemplateContainer}>
      {viewSelector({ form, setForm })}
    </div>
  )
}

export default ResetPwTemplate
