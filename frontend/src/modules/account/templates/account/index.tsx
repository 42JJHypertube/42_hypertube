'use client'

import { useState } from 'react'
import { LoginViewEnum, LoginView } from '@/types/account/type'
import LoginTemplate from '../login'
import FindPw from '../../components/findPw'
import RegisterTemplate from '../register'
import AccountNav from '../nav'

const viewSelector = ({ currentView }: { currentView: LoginView }) => {
  switch (currentView) {
    case LoginViewEnum.SIGN_IN:
      return <LoginTemplate />
    case LoginViewEnum.REGISTER:
      return <RegisterTemplate />
    case LoginViewEnum.FIND_PW:
      return <FindPw />
    default:
      return null
  }
}

function AccountTemplate() {
  const [currentView, setCurrentView] = useState(LoginViewEnum.SIGN_IN)

  return (
    <div>
      {viewSelector({ currentView })}
      <AccountNav setCurrentView={setCurrentView} />
    </div>
  )
}

export default AccountTemplate
