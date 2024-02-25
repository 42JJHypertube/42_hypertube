import { LoginViewEnum } from '@/types/account/type'

function AccountNav({
  setCurrentView,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}) {
  return (
    <nav>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}
      >
        go log in
      </button>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.REGISTER)}
      >
        go register
      </button>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.FIND_PW)}
      >
        find pwd
      </button>
    </nav>
  )
}

export default AccountNav
