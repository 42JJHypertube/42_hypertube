import { LoginViewEnum } from '@/types/account/type'
import { useFormState } from 'react-dom'
import Input from '@/modules/common/components/input'
import { registUser, RegisterFormInfo } from '../../action'
import styles from './register.module.scss'

type Props = {
  setCurrentView: React.Dispatch<React.SetStateAction<LoginViewEnum>>
}

const initialState: RegisterFormInfo = {
  email: '',
  nickname: '',
  lastName: '',
  firstName: '',
  password: '',
  password2: '',
  error_message: null,
  code: null,
  token: null,
}

function Register({ setCurrentView }: Props) {
  const [formInfo, formAction] = useFormState(registUser, initialState)

  return (
    <div className={styles.mainContainer}>
      <h3 className={styles.h1}> Register </h3>
      <form className={styles.registForm} action={formAction}>
        {formInfo.token == null ? (
          <>
            <Input name="email" type="email" required />
            <Input name="nickname" required />
            <Input name="firstname" required />
            <Input name="lastname" required />
            <Input name="password1" type="password" required />
            <Input name="password2" type="password" required />
          </>
        ) : (
          <Input name="code" required />
        )}
        <h2> {formInfo.error_message} </h2>
        <button type="submit"> Submit </button>
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
