import Image from 'next/image'
import style from './movieCard.module.scss'

type MovieCardProps = {
  title: string
  imgUrl: string
}

function MovieCard({ title, imgUrl }: MovieCardProps) {
  return (
    <div className={style.movieContainer}>
      <div className={style.movieCard}>
        <Image src={imgUrl} alt={title} fill />
      </div>
      <span>{title}</span>
    </div>
  )
}

export default MovieCard
