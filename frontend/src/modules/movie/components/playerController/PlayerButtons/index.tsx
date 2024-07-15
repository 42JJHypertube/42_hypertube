'use client'

import { useEffect, useState } from 'react'
import { FaPlay, FaRegStopCircle } from 'react-icons/fa' // 실행, 일시정지
import {
  MdSubtitles,
  MdFullscreen,
  MdFullscreenExit,
  MdSettings,
} from 'react-icons/md' // 화질 설정, 자막설정, 전체화면, 전체화면 탈출
import { AiFillSound } from 'react-icons/ai' // 사운드 설정 버튼
import styles from './index.module.scss'

type ButtonType = 'play' | 'volume' | 'subtitle' | 'quality' | 'fullScreen'
type Props = {
  type: ButtonType
  action?: any
  upperContent?: JSX.Element | null
  rightContent?: JSX.Element | null
  outSideRef?: any
  videoRef?: any
}

function selectIcon(icon: ButtonType): JSX.Element[] {
  switch (icon) {
    case 'play':
      return [<FaPlay />, <FaRegStopCircle />]
    case 'volume':
      return [<AiFillSound />, <AiFillSound />]
    case 'subtitle':
      return [<MdSubtitles />, <MdSubtitles />]
    case 'fullScreen':
      return [<MdFullscreen />, <MdFullscreenExit />]
    case 'quality':
      return [<MdSettings />, <MdSettings />]
  }
}

export default function PlayerButton({
  type,
  action = null,
  upperContent = null,
  rightContent = null,
  outSideRef = null,
  videoRef = null,
}: Props) {
  console.log('Component rendered type :', type, " upperContent: ", upperContent)
  const [toggle, setToggle] = useState<boolean>(false)
  const [active, deactive] = selectIcon(type)

  useEffect(() => {
    if (action) {
      if (toggle) action(true)
      if (!toggle) action(false)
    }
  }, [toggle, action])

  useEffect(() => {
    const switchToggle = (event : React.MouseEvent<HTMLUListElement, MouseEvent>) => {
      const target = event.target as HTMLLIElement
      if (!target.matches('video')) return;
      setToggle((prev) => !prev)   
    }
    const handleEnded = () => {
      console.log("END!")
      setToggle(false)
    }

    if (type == 'play') {
      if (outSideRef){
        outSideRef.addEventListener('click', switchToggle)
      }
      if (videoRef){
        videoRef.addEventListener('ended', handleEnded)
      }
    }
    
    return () => {
      if (outSideRef) outSideRef.removeEventListener('click', switchToggle)
      if (videoRef) videoRef.removeEventListener('ended', handleEnded)
    }
  }, [outSideRef, videoRef])

  return (
    <div className={styles.container}>
      <div className={`${styles.upperContent} ${toggle ? styles.on : styles.off}`}>{upperContent}</div>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          onClick={() => setToggle((prev) => !prev)}
        >
          {toggle ? deactive : active}
        </button>
        {rightContent}
      </div>
    </div>
  )
}
