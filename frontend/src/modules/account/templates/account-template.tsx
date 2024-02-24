'use client'

import { useState } from 'react'
import { LoginViewEnum, LoginView } from '@/types/account/type'
import LoginTemplate from './login-template'
import Register from '../components/register'
import FindPw from '../components/findPw'

const viewSelector = ({
  currentView,
  setCurrentView,
}: {
  currentView: LoginView
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}) => {
  switch (currentView) {
    case LoginViewEnum.SIGN_IN:
      return <LoginTemplate setCurrentView={setCurrentView} />
    case LoginViewEnum.REGISTER:
      return <Register setCurrentView={setCurrentView} />
    case LoginViewEnum.FIND_PW:
      return <FindPw setCurrentView={setCurrentView} />
    default:
      return null
  }
}

function AccountTemplate() {
  const [currentView, setCurrentView] = useState(LoginViewEnum.SIGN_IN)

  return <div>{viewSelector({ currentView, setCurrentView })}</div>
}

export default AccountTemplate
