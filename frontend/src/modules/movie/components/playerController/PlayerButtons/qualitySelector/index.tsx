'use client'

import { useCallback } from 'react'
import styles from './index.module.scss'

type Props = { hlsRef: any }

export default function QualitySelector({ hlsRef }: Props) {
  if (!hlsRef) return null
  const handleClick = useCallback((event: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const target = event.target as HTMLLIElement;
    if (!target.matches('li')) return; // li 요소가 아닌 경우 처리하지 않음
    const index = target.dataset.index; // 클릭된 li 요소의 인덱스 가져오기
    if (index !== undefined) {
      hlsRef.nextLevel = parseInt(index); // 다음 레벨로 설정
    }
  }, [hlsRef])
  
  return (
    <ul className={styles.ul} onClick={handleClick}>
      {hlsRef.levels.map((lv: any, index: string) => (
        <li
          className={styles.li}
          data-index={index}
          key={lv.height}
        >
          {lv.height}p
        </li>
      ))}
    </ul>
  )
}
