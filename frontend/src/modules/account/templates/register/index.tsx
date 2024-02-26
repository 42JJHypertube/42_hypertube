'use client'

import { useState } from 'react'
import { AuthForm } from '@/types/account/type'
import TypeAuth from '../../components/typeAuth'
import TypeEmail from '../../components/typeEmail'
import TypeRegistForm from '../../components/typeRegistForm'
import styles from './index.module.scss'

function viewSelector({
  form,
  setForm,
}: {
  form: AuthForm
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>
}) {
  switch (form.state) {
    case 'regist-email':
      return <TypeEmail form={form} setForm={setForm} />
    case 'regist-auth':
      return <TypeAuth form={form} setForm={setForm} />
    case 'regist-form':
      return <TypeRegistForm form={form} setForm={setForm} />
    default:
      return null
  }
}

const initialState: AuthForm = {
  state: 'regist-email',
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

function RegisterTemplate() {
  const [form, setForm] = useState<AuthForm>(initialState)

  return (
    <div className={styles.RegisterTemplateContainer}>
      <h2>Register</h2>
      {viewSelector({ form, setForm })}
    </div>
  )
}

export default RegisterTemplate
