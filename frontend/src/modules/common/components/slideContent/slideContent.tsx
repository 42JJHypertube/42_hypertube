'use client'

import styles from './index.module.scss'

type Props = {
  slideData: any[]
  ContentComponent: JSX.ElementType
  getKeyAndProps: (data: any) => { key: any; props: any }
}

function SlideContent({ slideData, getKeyAndProps, ContentComponent }: Props) {
  return slideData.map((data) => {
    const { key, props } = getKeyAndProps(data)
    return (
      <div className={styles.content} key={key}>
        <ContentComponent {...props} />
      </div>
    )
  })
}

export default SlideContent
