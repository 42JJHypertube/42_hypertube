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

type ButtonType = "play" | "volume" | 'subtitle' | 'quality' | 'fullScreen'  
type Props = {type: ButtonType, action?: any, icon?: any, setToggle?: React.Dispatch<React.SetStateAction<boolean>>, upperContent?: any}

function selectIcon(icon : ButtonType): JSX.Element[] {
    switch (icon) {
        case 'play' : return [<FaPlay/>, <FaRegStopCircle/>]
        case 'volume' : return [<AiFillSound/>, <AiFillSound/>]
        case 'subtitle' : return [<MdSubtitles/>, <MdSubtitles/>]
        case 'fullScreen' : return [<MdFullscreen/>, <MdFullscreenExit/>]
        case 'quality' : return [<MdSettings/>, <MdSettings/>]
    }
}

export default function PlayerButton ({type, action, icon, setToggle}: Props) {
    console.log('Component rendered type :', type);
    const [toggle, isToggle] = useState<boolean>(false)
    const [active, deactive] = selectIcon(type)
    useEffect(() => {
        if (toggle) action(true)
        if (!toggle) action(false)
    }, [toggle, action])

    
    return <button className={styles.container} onClick={() => isToggle(prev => !prev)}>{toggle ? deactive : active}</button>
}