'use client'

import { logOut } from '@/lib/data'

function LogoutButton() {
  return (
    <button type="submit" onClick={() => logOut()}>
      Log Out
    </button>
  )
}

export default LogoutButton
