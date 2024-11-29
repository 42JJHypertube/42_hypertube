'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'
import Input from '@/modules/common/components/input'
import ProfileImage from '@/modules/common/components/profileImage'
import FormButton from '@/modules/common/components/formButton'
import fileToBlob from '@/lib/utill/fileToBlob'
import ChangeInfo from '../changeInfo'
import styles from './index.module.scss'
import { setProfile } from '../../resetAction'

type ImageForm = {
  message: string | null
  profileImage: Blob | null
}

const initialForm: ImageForm = {
  message: null,
  profileImage: null,
}

export default function ChangeImage({ imageUrl }: { imageUrl: string }) {
  const [curForm, action] = useFormState(setProfile, initialForm)
  const [preview, setPreview] = useState<string | undefined>(undefined)

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0] // 첫 번째 파일만 선택
    if (file) {
      const blob = (await fileToBlob(file)) as Blob
      const newImageUrl = URL.createObjectURL(blob)
      setPreview(newImageUrl)
    } else setPreview(undefined)
  }

  return (
    <form action={action}>
      <ChangeInfo label="Image" currentInfo="Change Your Image">
        <div className={styles.imageBox}>
          <div className={styles.image}>
            <ProfileImage imageUrl={preview || imageUrl} />
          </div>
          <label className={styles.uploadButton} htmlFor="file">
            Choose File
          </label>
          <div className={styles.inputContainer}>
            <Input name="file" type="file" onChange={handleFileChange} />
          </div>
          <span> {curForm.message ? curForm.message : null}</span>
          <FormButton type="submit" content="프로필 변경하기" positive />
        </div>
      </ChangeInfo>
    </form>
  )
}
