import { LoginViewEnum } from '@/types/account/type'

type Props = {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}

function Register({ setCurrentView }: Props) {
  return (
    <div>
      <form>
        <input />
        <input />
        <input />
        <input />
        <input />
      </form>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}
      >
        go log in
      </button>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.FIND_PW)}
      >
        find pwd
      </button>
    </div>
  )
}

export default Register
