'use client'

import { useFormState } from 'react-dom'
import ProfileImage from '@/modules/common/components/profileImage'
import ChangeInfo from '../changeInfo'
import Input from '@/modules/common/components/input'
import styles from './index.module.scss'
import FormButton from '@/modules/common/components/formButton'
import { useState } from 'react'
import { setProfile } from '../../action'
import fileToBlob from '@/lib/utill/fileToBlob'

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
  const [preview, setPreview] = useState<any>(null)

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0] // 첫 번째 파일만 선택
    if (file) {
      const blob = (await fileToBlob(file)) as Blob
      const imageUrl = URL.createObjectURL(blob)
      setPreview(imageUrl)
    }
  }

  return (
    <form action={action}>
      <ChangeInfo label="Image" currentInfo={'Change Your Image'}>
        <div className={styles.imageBox}>
          <div className={styles.image}>
            <ProfileImage imageUrl={preview ? preview : imageUrl} />
          </div>
          <label className={styles.uploadButton} htmlFor="profileImage">
            Choose File
          </label>
          <div className={styles.inputContainer}>
            <Input
              name="profileImage"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <span> {curForm.message ? curForm.message : null}</span>
          <FormButton type="submit" content="프로필 변경하기" positive />
        </div>
      </ChangeInfo>
    </form>
  )
}
