'use client'

import { useEffect, useState } from 'react'
import React, { Dispatch, SetStateAction } from 'react'
import { LoginViewEnum, LoginView } from '@/types/account/type'
import LoginTemplate from '../login'
import ResetPwTemplate from '../resetPw'
import RegisterTemplate from '../register'
import styles from './index.module.scss'

interface ViewProps {
  email?: string
  currentView: LoginView
  setCurrentView: Dispatch<SetStateAction<LoginViewEnum>>
  setEmail: Dispatch<React.SetStateAction<string | undefined>>
}

const viewSelector = ({ email, currentView, setCurrentView, setEmail }: ViewProps) => {
  switch (currentView) {
    case LoginViewEnum.SIGN_IN:
      return <LoginTemplate setCurrentView={setCurrentView} setEmail={setEmail}/>
    case LoginViewEnum.REGISTER:
      return <RegisterTemplate setCurrentView={setCurrentView} email={email} setEmail={setEmail}/>
    case LoginViewEnum.FIND_PW:
      return <ResetPwTemplate />
    default:
      return null
  }
}

const infoSelector = (currentView: LoginView) => {
  switch (currentView) {
    case LoginViewEnum.SIGN_IN:
      return {
        title: 'Hyper Tube에 오신걸 환영합니다',
        content:
          '모든 영화인들을 위한 HyperTube 회원 커뮤니티에 오신 것을 환영합니다. 로그인을 완료하고 모험을 시작하세요.',
      }
    case LoginViewEnum.REGISTER:
      return {
        title: 'Hyper Tube에 가입하세요',
        content:
          '모든 영화인들을 위한 HyperTube 회원 커뮤니티에 오신 것을 환영합니다. 가입을 완료하고 모험을 시작하세요.',
      }
    case LoginViewEnum.FIND_PW:
      return {
        title: '비밀번호를 잊으셨나요?',
        content: '새로 비밀번호를 설정하고 모험을 시작하세요.',
      }
    default:
      return null
  }
}

function AccountTemplate() {
  const [currentView, setCurrentView] = useState<LoginViewEnum>(
    LoginViewEnum.SIGN_IN,
  )
  const [info, setInfo] = useState(infoSelector(currentView))
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [isAnimating, setIsAnimating] = useState(true)

  //광클했을 때 애니메이션이 적용되지않는 문제가있음..
  useEffect(() => {
    setInfo(infoSelector(currentView))
    // setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 2000) // 애니메이션 시간 (2초) 후에 다시 초기화

    return () => {
      clearTimeout(timer)
      setIsAnimating(true)
    }
  }, [currentView])

  return (
    <div className={styles.container}>
      <div
        className={
          isAnimating
            ? `${styles.information} ${styles.infoAni}`
            : styles.information
        }
      >
        <div className={styles.bigInfo}>{info?.title}</div>
        <div className={styles.smallInfo}>{info?.content}</div>
      </div>
      {viewSelector({ email, currentView, setCurrentView, setEmail })}
    </div>
  )
}

export default AccountTemplate
