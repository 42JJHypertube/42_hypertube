'use client'

import { useState } from 'react'
import { LoginViewEnum, LoginView } from '@/types/account/type'
import LoginTemplate from '../login'
import ResetPwTemplate from '../resetPw'
import RegisterTemplate from '../register'
import AccountNav from '../../components/nav'
import styles from './index.module.scss'
import TestButton from '@/modules/test'

const viewSelector = ({ currentView }: { currentView: LoginView }) => {
  switch (currentView) {
    case LoginViewEnum.SIGN_IN:
      return <LoginTemplate />
    case LoginViewEnum.REGISTER:
      return <RegisterTemplate />
    case LoginViewEnum.FIND_PW:
      return <ResetPwTemplate />
    default:
      return null
  }
}

const headerSelector = ({ currentView }: { currentView: LoginView }) => {
  switch (currentView) {
    case LoginViewEnum.SIGN_IN:
      return 'Log in'
    case LoginViewEnum.REGISTER:
      return 'Register'
    case LoginViewEnum.FIND_PW:
      return 'Find password'
    default:
      return null
  }
}

function AccountTemplate() {
  const [currentView, setCurrentView] = useState(LoginViewEnum.SIGN_IN)
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {headerSelector({ currentView })}
        <TestButton />
      </header>
      {viewSelector({ currentView })}
      <AccountNav setCurrentView={setCurrentView} />
    </div>
  )
}

export default AccountTemplate
