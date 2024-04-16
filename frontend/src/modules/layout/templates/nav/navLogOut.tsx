'use client'

import { logOut } from '@/lib/data'

function NavLogOut() {
  return (
    <button type="submit" onClick={() => logOut()}>
      Log Out
    </button>
  )
}

export default NavLogOut
