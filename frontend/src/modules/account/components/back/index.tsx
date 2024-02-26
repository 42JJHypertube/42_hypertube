'use client'

import { FaArrowLeft } from 'react-icons/fa'
import { AuthForm, AuthSequence } from '@/types/account/type'
import styles from './/index.module.scss'

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

function Back({
  form,
  setForm,
}: {
  form: AuthForm
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>
}) {
  let init: AuthSequence
  if (form.state.includes('login')) init = 'login-email' as AuthSequence
  else init = 'regist-email' as AuthSequence
  return (
    <>
      <button
        type="button"
        className={styles.leftArrowButton}
        onClick={() => setForm({ ...initialState, state: init })}
      >
        <FaArrowLeft />
      </button>
    </>
  )
}

export default Back
