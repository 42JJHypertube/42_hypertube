'use client'

import Image from 'next/image'
import styles from './profileImage.module.scss'
import { useState } from 'react'

function ProfileImage({ imageUrl }: { imageUrl: string }) {
  const [src, setSrc] = useState(imageUrl ? imageUrl : '/defaultProfile.jpeg')

  const handleError = () => {
    setSrc('/defaultProfile.jpeg') // 이미지 로드 실패 시 기본 이미지로 대체
  }

  return (
    <div className={styles.container}>
      <Image
        src={src}
        alt="profileImage"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fill
        onError={() => {
          handleError()
        }}
      />
    </div>
  )
}

export default ProfileImage
