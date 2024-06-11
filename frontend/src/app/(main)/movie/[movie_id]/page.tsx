import { getMovieDetail, getMovieInfo, getTorrentData } from '@/lib/data'
import { notFound } from 'next/navigation'
import styles from './layout.module.scss'
import Image from 'next/image'
import { BsFillStarFill } from 'react-icons/bs'
import { FaRegThumbsUp } from 'react-icons/fa'
import VideoPlayer from '@/modules/common/components/videoPlayer'

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
            <VideoPlayer
              status={movieData.response?.status}
              hlsPlaylistPath={movieData.data?.hlsPlaylistPath}
              movieState={movieData.data?.movieState}
              torrentHash={movieData.data?.torrentHash}
              imdb_id={imdb_id}
            />
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
      </div>
    </div>
  )
}
// {
//   "adult": false,
//   "backdrop_path": "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
//   "belongs_to_collection": null,
//   "budget": 25000000,
//   "genres": [
//     {
//       "id": 18,
//       "name": "Drama"
//     },
//     {
//       "id": 80,
//       "name": "Crime"
//     }
//   ],
//   "homepage": "",
//   "id": 278,
//   "imdb_id": "tt0111161",
//   "original_language": "en",
//   "original_title": "The Shawshank Redemption",
//   "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
//   "popularity": 270.882,
//   "poster_path": "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
//   "production_companies": [
//     {
//       "id": 97,
//       "logo_path": "/7znWcbDd4PcJzJUlJxYqAlPPykp.png",
//       "name": "Castle Rock Entertainment",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "1994-09-23",
//   "revenue": 28341469,
//   "runtime": 142,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "Fear can hold you prisoner. Hope can set you free.",
//   "title": "The Shawshank Redemption",
//   "video": false,
//   "vote_average": 8.704,
//   "vote_count": 25959
// }
