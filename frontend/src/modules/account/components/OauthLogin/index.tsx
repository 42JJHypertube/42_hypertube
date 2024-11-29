import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'

function OauthLogin() {
  return (
    <nav className={styles.AccountNavContainer}>
      <div className={styles.seperatorContainer}>
        <div className={styles.seperator} />
        <div className={styles.text}> OR </div>
        <div className={styles.seperator} />
      </div>
      <div className={styles.AccountNavOauth}>
        <Link
          href="https://localhost/api/auth/oauth2/login/google"
          prefetch={false}
        >
          <Image
            width="30"
            height="30"
            src="/authImage/google.svg"
            alt="google login"
          />
        </Link>
        <Link
          href="https://localhost/api/auth/oauth2/login/42"
          prefetch={false}
        >
          <Image
            width="30"
            height="30"
            src="/authImage/fortytwo.svg"
            alt="fortytwo login"
          />
        </Link>
        <Link
          href="https://localhost/api/auth/oauth2/login/facebook"
          prefetch={false}
        >
          <Image
            width="30"
            height="30"
            src="/authImage/facebook.svg"
            alt="facebook login"
          />
        </Link>
      </div>
    </nav>
  )
}

export default OauthLogin
