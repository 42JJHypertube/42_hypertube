'use client'

import { useFormState } from 'react-dom'
import Input from '@/modules/common/components/input'
import { confirm2FA } from '@/modules/account/action'
import styles from './auth.module.scss'

export default function Auth2FA() {
  const [message, formAction] = useFormState(confirm2FA, null)

  console.log(message) // must delete
  return (
    <div className={styles.twoFAContainer}>
      <h3 className={styles.twoFATitle}> 2FA </h3>
      <form className={styles.twoFAForm} action={formAction}>
        <Input name="code" />
        <button type="submit"> Submit </button>
      </form>
    </div>
  )
}
