'use client'

import Image from 'next/image'
import styles from './profileImage.module.scss'

function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className={styles.container}>
      <Image
        src={imageUrl}
        alt="profileImage"
        style={{
          objectFit: 'contain',
        }}
        fill
      />
    </div>
  )
}

export default ProfileImage
