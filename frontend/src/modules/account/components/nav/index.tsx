import { LoginViewEnum } from '@/types/account/type'
import Link from 'next/link'
import styles from './index.module.scss'

function AccountNav({
  setCurrentView,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}) {
  return (
    <nav className={styles.AccountNavContainer}>
      <div className={styles.AccountNavOauth}>
        <Link
          href="https://localhost/api/auth/oauth2/login/google"
          prefetch={false}
        >
          <img src="/authImage/google.svg" alt="google login" />
        </Link>
        <Link
          href="https://localhost/api/auth/oauth2/login/42"
          prefetch={false}
        >
          <div className={styles.customAuth}> Continue with 42 </div>
        </Link>
        {/* <Link
          href="https://localhost/api/auth/oauth2/login/google"
          prefetch={false}
        >
          <img src="/authImage/google.svg" alt="google login" />
        </Link> */}
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
