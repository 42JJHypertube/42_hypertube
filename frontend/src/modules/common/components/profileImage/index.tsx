'use client'

import Image from 'next/image'
import styles from './profileImage.module.scss'

function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className={styles.container}>
      <Image
        src={imageUrl ? imageUrl : '/defaultProfile.jpeg'}
        alt="profileImage"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fill
      />
    </div>
  )
}

export default ProfileImage
