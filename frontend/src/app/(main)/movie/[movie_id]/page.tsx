import { getMovieDetail } from '@/lib/data'
import { notFound } from 'next/navigation'
import styles from './layout.module.scss'
import Image from 'next/image'
import { BsFillStarFill } from 'react-icons/bs'
import { FaRegThumbsUp } from 'react-icons/fa'
import CommentSection from '@/modules/movie/components/commentSection'

export default async function movieInfo({
  params,
}: {
  params: { movie_id: number }
}) {
  const res = await getMovieDetail(params)
  console.log(res)
  if (res.response.status !== 200) return notFound()

  const { data } = res

  return (
    <div className={styles.movieDetailContainer}>
      <div className={styles.detail}>
        <div className={styles.titleAndScore}>
          <div className={styles.title}>
            <h2>{data.original_title}</h2>
            <p className={styles.movieInfo}>
              {data.release_date} · {data.runtime} min
            </p>
          </div>
          <div className={styles.score}>
            <div className={styles.rating}>
              Rating
              <div>
                <BsFillStarFill className={styles.star} color="yellow" />
                <span>{data.vote_average}</span>
              </div>
            </div>
            <div className={styles.popularity}>
              Popularity
              <div>
                <FaRegThumbsUp color="red" />
                <span> {data.popularity} </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.posterAndPlayer}>
          <div className={styles.poster}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.original_title}
              fill
            />
          </div>
          <div className={styles.player}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.genreContainer}>
            {data.genres.map((genre: { id: number; name: string }) => (
              <div className={styles.genre}>{genre.name}</div>
            ))}
          </div>
          <div className={styles.div} />
          <div className={styles.overview}>{data.overview}</div>
        </div>
        <CommentSection movieId={1} /> {/* movieId should be changed */}
      </div>
    </div>
  )
}
