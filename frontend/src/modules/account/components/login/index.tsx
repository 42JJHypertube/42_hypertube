import { LoginViewEnum } from '@/types/account/type'
import Input from '@/modules/common/components/input'
import { useFormState } from 'react-dom'
import { loginUser, LoginFormInfo } from '../../action'
import styles from './login.module.scss'

type Props = {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}

const initialState: LoginFormInfo = {
  error_message: null,
  auth_token: null,
}

function Login({ setCurrentView }: Props) {
  const [formInfo, formAction] = useFormState(loginUser, initialState)

  return (
    <div className={styles.loginContainer}>
      <h3 className={styles.loginTitle}> LogIn </h3>
      <form className={styles.loginForm} action={formAction}>
        {formInfo.auth_token == null ? (
          <>
            <Input name="id" />
            <Input name="password" type="password" />
          </>
        ) : (
          <Input name="code" />
        )}
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
