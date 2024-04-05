'use client'

import { useFormState } from 'react-dom'
import ProfileImage from '@/modules/common/components/profileImage'
import ChangeInfo from '../changeInfo'
import Input from '@/modules/common/components/input'
import FormButton from '@/modules/common/components/formButton'

export default function ChangeImage({ imageUrl }: { imageUrl: string }) {
  const [curForm, action] = useFormState(() => ({}), {})

  return (
    <form action={action}>
      <ChangeInfo
        label="Image"
        currentInfo={
          <ProfileImage imageUrl={imageUrl ? imageUrl : './next.svg'} />
        }
      >
        <div>
          <Input name="" type="file" />
          {/* <span> { curForm.message ? curForm.message  : null }</span> */}
          {/* <FormButton type="submit" content={curForm.state === "resetPw-auth" ? "인증하기" : "비밀번호 변경" } positive />`` */}
        </div>
      </ChangeInfo>
    </form>
  )
}
