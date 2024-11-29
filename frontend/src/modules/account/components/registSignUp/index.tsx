import Input from '@/modules/common/components/input'

const RegistSignUp = () => {
  return (
    <>
      <Input name="nickname" required />
      <Input name="firstName" required />
      <Input name="lastName" required />
      <Input name="password" type="password" required />
      <Input name="password2" type="password" required />
    </>
  )
}

export default RegistSignUp
