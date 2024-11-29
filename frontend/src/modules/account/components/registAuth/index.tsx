
import { useState } from 'react'
import { actionWrapper, getAuthCode } from '@/lib/data'
import Input from '@/modules/common/components/input'
import InnerInputButton from '@/modules/common/components/innerInputButton'

export type RegistAuthProps = {
  email: string
  message: string | null
  resetFormState: () => void
}

const RegistAuth = ({ email, resetFormState, message }: RegistAuthProps) => {
  const [isPending, setIsPending] = useState(false)
  const handleReSend = async () => {
    setIsPending(true);
    console.log(await actionWrapper({action :getAuthCode, param: {email}}))
    setIsPending(false);
  }

  return (
    <>
      <Input
        name="email"
        type="email"
        value={email}
        readOnly
        innerButton={<InnerInputButton title="수정" onClick={resetFormState} />}
      />
      <div> 위의 메일로 인증코드가 전송되었습니다 ! </div>
      <Input
        name="code"
        type="text"
        error={!!message}
        required
        innerButton={
          <InnerInputButton
            title="코드 재 전송"
            pending={isPending}
            onClick={handleReSend}
          />
        }
      />
    </>
  )
}

export default RegistAuth
