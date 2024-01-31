import { LoginViewEnum } from '@/types/account/type'

type Props = {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}

function FindPw({ setCurrentView }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.REGISTER)}
      >
        be a member
      </button>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}
      >
        go login
      </button>
    </>
  )
}

export default FindPw
