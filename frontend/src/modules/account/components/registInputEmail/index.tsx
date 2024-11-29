import Input from '@/modules/common/components/input'
import { useCallback, useState } from 'react'

const RegistInputEmail = ({email} : {email: string}) => {
  const [inputEmail, setEmail] = useState(email)

  const handleEmailInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    },
    [setEmail],
  )

  return (
    <Input
      name="email"
      type="email"
      onChange={handleEmailInput}
      value={inputEmail}
      required
    />
  )
}

export default RegistInputEmail
