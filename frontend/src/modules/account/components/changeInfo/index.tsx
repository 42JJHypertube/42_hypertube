'use client'

import useToggleState from '@/lib/hooks/useToggleState'
import styles from './index.module.scss'
type changeBoxProps = {
  label: string
  currentInfo: string | React.ReactNode
  children?: React.ReactNode
}

export default function ChangeInfo({
  label,
  currentInfo,
  children,
}: changeBoxProps) {
  const { state, toggle } = useToggleState()

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.label}>{label}</div>
          <div className={styles.info}>{currentInfo}</div>
        </div>
        <div className={styles.button}>
          <button type="button" onClick={() => toggle()}>
            {state ? 'Cancle' : 'Edit'}
          </button>
        </div>
      </div>
      {state ? <div className={styles.children}>{children}</div> : null}
      <div className={styles.bar}></div>
    </>
  )
}
