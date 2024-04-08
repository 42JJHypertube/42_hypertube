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
        <Image src={imgUrl} alt={title} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'/>
      </div>
      <span>{title}</span>
    </div>
  )
}

export default MovieCard
