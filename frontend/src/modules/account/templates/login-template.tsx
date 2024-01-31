'use client'

import { useState } from 'react'
import { LoginViewEnum, LoginView } from '@/types/account/type'
import Login from '../components/login'
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
      return <Login setCurrentView={setCurrentView} />
    case LoginViewEnum.REGISTER:
      return <Register setCurrentView={setCurrentView} />
    case LoginViewEnum.FIND_PW:
      return <FindPw setCurrentView={setCurrentView} />
    default:
      return null
  }
}

function LoginTemplate() {
  const [currentView, setCurrentView] = useState(LoginViewEnum.SIGN_IN)

  return <div>{viewSelector({ currentView, setCurrentView })}</div>
}

export default LoginTemplate
