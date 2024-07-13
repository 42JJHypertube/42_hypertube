'use client'

import styles from './index.module.scss'

type Props = { hlsRef: any }

export default function QualitySelector({ hlsRef }: Props) {
  if (!hlsRef) return null
  return (
    <ul className={styles.ul}>
      {hlsRef.levels.map((lv: any, index: number) => (
        <li
          className={styles.li}
          key={lv.height}
          onClick={() => {
            hlsRef.nextLevel = index
          }}
        >
          {lv.height}p
        </li>
      ))}
    </ul>
  )
}
