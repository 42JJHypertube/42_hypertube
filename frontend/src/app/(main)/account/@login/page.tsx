'use client'

import AccountTemplate from '@/modules/account/templates/account'
import AccountProvider from '@/modules/account/components/accountProvider'

export default function Login() {
  return (
    <AccountProvider>
      <AccountTemplate />
    </AccountProvider>
  )
}
