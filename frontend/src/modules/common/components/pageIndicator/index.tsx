'use client'

type Props = {
  pageCount: number
  pageIdx: number
}

function PageIndicator({ pageCount, pageIdx }: Props) {
  return (
    <ul>
      {Array.from({ length: pageCount }).map((_, idx) => {
        return <li key={idx} className={pageIdx === idx ? 'active' : ''}></li>
      })}
    </ul>
  )
}

export default PageIndicator
