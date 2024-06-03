import Image from 'next/image'
import { useRouter } from 'next/navigation'
import style from './movieCard.module.scss'

type MovieCardProps = {
  title: string
  imgUrl: string
  movie_id: number
}

function MovieCard({ title, imgUrl, movie_id }: MovieCardProps) {
  const router = useRouter()

  return (
    <div className={style.movieContainer}>
      <div
        className={style.movieCard}
        onClick={() => router.push(`/movie/${movie_id}`)}
      >
        <Image
          src={imgUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  )
}

export default MovieCard
