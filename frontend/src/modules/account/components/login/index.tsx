import { LoginViewEnum } from '@/types/account/type'
import Input from '@/modules/common/components/input'
import { useFormState } from 'react-dom'
import { loginUser } from '../../action'
import styles from './login.module.scss'

type Props = {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}

function Login({ setCurrentView }: Props) {
  const [message, formAction] = useFormState(loginUser, null)

  console.log(message) // must delete
  return (
    <div className={styles.loginContainer}>
      <h3 className={styles.loginTitle}> LogIn </h3>
      <form className={styles.loginForm} action={formAction}>
        <Input name="id" />
        <Input name="password" type="password" />
        <button type="submit"> Submit </button>
      </form>
      <button
        type="button"
        onClick={() => setCurrentView(LoginViewEnum.REGISTER)}
      >
        be a member
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

export default Login
