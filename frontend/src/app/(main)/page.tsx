import { getMovie } from '@/lib/data'
import MovieCard from '@/modules/main/components/movieCard'
import styles from './main.module.scss'

export default async function Home() {
  const ret = await getMovie(1)

  if (ret.response.status !== 200) return <div> Error </div>

  const movieInfo = ret.data.results

  return (
    <div className={styles.main}>
      <h3>Most Popular Movies</h3>
      <div className={styles.mainMovieCardContainer}>
        {movieInfo.map((info: Record<string, string>) => (
          <MovieCard
            key={info.title}
            title={info.title}
            imgUrl={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
          />
        ))}
      </div>
    </div>
  )
}
