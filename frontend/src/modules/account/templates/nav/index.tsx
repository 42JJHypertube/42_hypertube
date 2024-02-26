'use client'

import { LoginViewEnum } from '@/types/account/type'
import styles from './index.module.scss'

async function authGoogle() {
  const apiUrl = 'https://localhost/api/auth/oauth2/login/google'
  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // 또는 다른 HTTP 메소드
      mode: 'no-cors',
      // 다른 필요한 옵션들을 추가할 수 있습니다.
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! ${response}`)
    }

    const locationHeader = response.headers.get('location')
    if (locationHeader) {
      window.location.href = locationHeader
    }
  } catch (error) {
    console.error('Error sending login request:', error)
    // 에러 처리 로직을 추가합니다.
  }
}

function AccountNav({
  setCurrentView,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}) {
  return (
    <nav className={styles.AccountNavContainer}>
      <div>
        <button
          type="button"
          className={styles.googleAuth}
          onClick={authGoogle}
        >
          <img src="/authImage/google.svg" alt="SVG Button" />
        </button>
      </div>
      <div className={styles.AccountNavLine}>
        <span className={styles.text}> If you have Account </span>
        <button
          type="button"
          onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}
          className={styles.button}
        >
          Log-In
        </button>
      </div>
      <div className={styles.AccountNavLine}>
        <span className={styles.text}> No Account? </span>
        <button
          type="button"
          onClick={() => setCurrentView(LoginViewEnum.REGISTER)}
          className={styles.button}
        >
          Sign-Up
        </button>
      </div>
      <div className={styles.AccountNavLine}>
        <span className={styles.text}> Forgot your password? </span>
        <button
          type="button"
          onClick={() => setCurrentView(LoginViewEnum.FIND_PW)}
          className={styles.button}
        >
          Find Password
        </button>
      </div>
    </nav>
  )
}

export default AccountNav
