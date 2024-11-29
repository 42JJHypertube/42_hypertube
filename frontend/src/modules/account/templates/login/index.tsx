'use client'

import { memo } from 'react'
import OauthLogin from '../../components/OauthLogin'
import styles from './index.module.scss'
import LoginMain from '../../components/loginMain'
import AccountRedir from '../../components/accountRedir'

function LoginTemplate() {
  return (
    <div className={styles.loginContainer}>
      <LoginMain />
      <AccountRedir />
      <OauthLogin />
    </div>
  )
}

export default memo(LoginTemplate)
