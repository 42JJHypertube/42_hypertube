import { useFormState } from 'react-dom'
import Input from '@/modules/common/components/input'
import { AuthForm } from '@/types/account/type'
import { useEffect } from 'react'
import FormButton from '@/modules/common/components/formButton'
import { registUser } from '../../action'
import styles from './index.module.scss'

function TypeRegistForm({
  form,
  setForm,
}: {
  form: AuthForm
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>
}) {
  const [curForm, formAction] = useFormState(registUser, form)

  useEffect(() => {
    setForm(curForm)
  }, [curForm])

  return (
    <div className={styles.TypeRegistFormContainer}>
      <form className={styles.TypeRegistForm} action={formAction}>
        <Input name="nickname" required />
        <Input name="firstName" required />
        <Input name="lastName" required />
        <Input name="password" type="password" required />
        <Input name="password2" type="password" required />
        {curForm.message ? (
          <span className={styles.infoMessage}> {form.message} </span>
        ) : null}
        <FormButton type="submit" content="회원가입 신청하기" positive />
      </form>
    </div>
  )
}

export default TypeRegistForm
