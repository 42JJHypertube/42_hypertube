import { LoginView, LoginViewEnum } from '@/types/account/type'
import { useAccountContext } from '../accountProvider'
import styles from './index.module.scss'
import { useCallback } from 'react'

function getContents(currentView: LoginView) {
  switch (currentView) {
    case 'sign-in':
      return {
        header: '아직 멤버가 아니신가요?',
        contents: '회원 가입',
        redirectTo: LoginViewEnum.REGISTER,
      }
    case 'register' || 'find-pw':
      return {
        header: '이미 계정이 있으신가요?',
        contents: '로그인',
        redirectTo: LoginViewEnum.SIGN_IN,
      }
    default:
      return {
        header: '이미 계정이 있으신가요?',
        contents: '로그인',
        redirectTo: LoginViewEnum.SIGN_IN,
      }
  }
}

const AccountRedir = () => {
  const { currentView, setCurrentView, setEmail } = useAccountContext()
  const { header, contents, redirectTo } = getContents(currentView)

  const handleChangeView = useCallback(() => {
    setEmail('')
    setCurrentView(redirectTo)
  }, [setCurrentView, setEmail])

  return (
    <div className={styles.redirect}>
      {header}
      <button
        type="button"
        className={styles.aTag}
        onClick={handleChangeView}
      >
        {contents}
      </button>
    </div>
  )
}

export default AccountRedir
