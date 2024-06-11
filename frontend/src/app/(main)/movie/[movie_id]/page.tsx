import { getMovieDetail, getMovieInfo, getTorrentData } from '@/lib/data'
import { notFound } from 'next/navigation'
import styles from './layout.module.scss'
import Image from 'next/image'
import { BsFillStarFill } from 'react-icons/bs'
import { FaRegThumbsUp } from 'react-icons/fa'
import VideoPlayer from '@/modules/common/components/videoPlayer'
import CommentSection from '@/modules/movie/components/commentSection'

export default async function movieInfo({
  params,
}: {
  params: { movie_id: number }
}) {
  const res = await getMovieDetail(params)
  if (res.response.status !== 200) return notFound()

  const {
    imdb_id,
    original_title,
    release_date,
    runtime,
    vote_average,
    popularity,
    genres,
    overview,
    poster_path,
  } = res.data
  const movieData = await getMovieInfo({ imdb_id })
  return (
    <div className={styles.movieDetailContainer}>
      <div className={styles.detail}>
        <div className={styles.titleAndScore}>
          <div className={styles.title}>
            <h2>{original_title}</h2>
            <p className={styles.movieInfo}>
              {release_date} · {runtime} min
            </p>
          </div>
          <div className={styles.score}>
            <div className={styles.rating}>
              Rating
              <div>
                <BsFillStarFill className={styles.star} color="yellow" />
                <span>{vote_average}</span>
              </div>
            </div>
            <div className={styles.popularity}>
              Popularity
              <div>
                <FaRegThumbsUp color="red" />
                <span> {popularity} </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.posterAndPlayer}>
          <div className={styles.poster}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={original_title}
              fill
            />
          </div>
          <div className={styles.player}>
            <VideoPlayer imdb_id={imdb_id} />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.genreContainer}>
            {genres.map((genre: { id: number; name: string }) => (
              <div className={styles.genre}>{genre.name}</div>
            ))}
          </div>
          <div className={styles.div} />
          <div className={styles.overview}>{overview}</div>
        </div>
        <CommentSection movieId={movieData.data.id} />{' '}
        {/* movieId should be changed */}
      </div>
    </div>
  )
}
