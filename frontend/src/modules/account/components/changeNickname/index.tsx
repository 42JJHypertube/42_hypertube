'use client'

import { useFormState } from 'react-dom'
import ChangeInfo from '../changeInfo'
import Input from '@/modules/common/components/input'
import FormButton from '@/modules/common/components/formButton'

export default function ChangeNickname({ nickname }: { nickname: string }) {
  const [curForm, action] = useFormState(() => ({}), {})

  return (
    <form action={action}>
      <ChangeInfo label="Nickname" currentInfo={nickname}>
        <div>
          <Input name="nickname" />
          {/* <span> { curForm.message ? curForm.message  : null }</span> */}
          {/* <FormButton type="submit" content={curForm.state === "resetPw-auth" ? "인증하기" : "비밀번호 변경" } positive />`` */}
        </div>
      </ChangeInfo>
    </form>
  )
}
