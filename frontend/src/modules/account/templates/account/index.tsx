'use client'

import { LoginViewEnum, LoginView } from '@/types/account/type'
import { useAccountContext } from '../../components/accountProvider'
import LoginTemplate from '../login'
import ResetPwTemplate from '../resetPw'
import RegisterTemplate from '../register'
import styles from './index.module.scss'

const viewSelector = (currentView: LoginView) => {
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
        title: 'Hyper Tube 에\n가입하세요',
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
  const { currentView } = useAccountContext()

  // 최적화?
  const info = infoSelector(currentView)
  const page = viewSelector(currentView)

  return (
    <div className={styles.container}>
      <div
        key={currentView}
        className={`${styles.information} ${styles.infoAni}`}
      >
        <div className={styles.bigInfo}>{info?.title}</div>
        <div className={styles.smallInfo}>{info?.content}</div>
      </div>
      {page}
    </div>
  )
}

export default AccountTemplate
