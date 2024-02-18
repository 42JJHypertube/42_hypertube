import Image from 'next/image'
import style from './movieCard.module.scss'

type MovieCardProps = {
  title: string
  imgUrl: string
}

function MovieCard({ title, imgUrl }: MovieCardProps) {
  return (
    <div className={style.movieCard}>
      <Image
        src={imgUrl}
        alt={title}
        width={300}
        height={500}
        layout="responsive"
      />
      {title}
    </div>
  )
}

export default MovieCard
