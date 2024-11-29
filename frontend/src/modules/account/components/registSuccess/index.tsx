import { LoginViewEnum } from '@/types/account/type'
import { useAccountContext } from '../accountProvider'
import styles from './index.module.scss'

const RegistSuccess = () => {
  const { setCurrentView } = useAccountContext()
  return (
    <div>
      <div> 회원 가입에 성공했습니다 !</div>
      <div className={styles.redirect}>
        {' '}
        로그인 후 이용해보세요 !{' '}
        <button
          type="button"
          className={styles.aTag}
          onClick={() => setCurrentView(LoginViewEnum.SIGN_IN)}
        >
          로그인으로 이동
        </button>
      </div>
    </div>
  )
}

export default RegistSuccess
