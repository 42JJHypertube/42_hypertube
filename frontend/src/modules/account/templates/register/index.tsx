'use client'

import FormButton from '@/modules/common/components/formButton'
import { RegistStatus, RegistForm } from '@/types/account/type'
import AccountRedir from '../../components/accountRedir'
import styles from './index.module.scss'
import useRegistForm from '@/lib/hooks/useRegistForm'
import RegistSuccess from '../../components/registSuccess'
import RegistInputEmail from '../../components/registInputEmail'
import RegistAuth from '../../components/registAuth'
import RegistSignUp from '../../components/registSignUp'
import { useAccountContext } from '../../components/accountProvider'

const componentMap: Record<RegistStatus, (props: any) => JSX.Element> = {
  INPUT_EMAIL: (props) => <RegistInputEmail {...props} />,
  WAITING_VERIFICATION: (props) => <RegistAuth {...props} />,
  AUTHENTICATED: (props) => <RegistSignUp {...props} />,
  COMPLETED: (props) => <RegistSuccess {...props} />,
}

function getRegistStatusComponent(
  status: RegistStatus,
  props: any,
): JSX.Element {
  const Component = componentMap[status]
  return Component(props)
}


function RegisterTemplate() {
  const { email : fixedEmail } = useAccountContext();
  const initialForm: RegistForm =  {
    email: !!fixedEmail ? fixedEmail : '',
    emailToken: '',
    message: null,
    status: !!fixedEmail ? 'WAITING_VERIFICATION' : 'INPUT_EMAIL',
  }
  const { email, message, status, registAction, resetFormState } = useRegistForm(initialForm)
  const currentStatusComponent = getRegistStatusComponent(status, {
    email,
    message,
    resetFormState,
  })

  return (
    <div className={styles.registContainer}>
      <form action={registAction}>
        {currentStatusComponent}
        <FormButton type="submit" content="계속하기" positive />
        <span className={styles.errorMessage}>{message}</span>
        <AccountRedir />
      </form>
    </div>
  )
}

export default RegisterTemplate
