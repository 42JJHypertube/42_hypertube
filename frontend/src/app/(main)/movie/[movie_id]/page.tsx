import { getMovieDetail, getMovieInfo, getTorrentData } from '@/lib/data'
import { notFound } from 'next/navigation'
import styles from './layout.module.scss'
import Image from 'next/image'
import { BsFillStarFill } from 'react-icons/bs'
import { FaRegThumbsUp } from 'react-icons/fa'
import TorrentList from '@/modules/movie/components/torrentList'

export default async function movieInfo({
  params,
}: {
  params: { movie_id: number }
}) {
  const res = await getMovieDetail(params)
  if (res.response.status !== 200) return notFound()

  const { data } = res
  const torrentData = await getTorrentData({ imdb_id: data.imdb_id })
  const movieData = await getMovieInfo({imdb_id: data.imdb_id})
  

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
          <div className={styles.player}/>
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
      </div>
      {torrentData.data?.data?.movie?.torrents && (
        <TorrentList
          imdb_id={torrentData.data.data.movie.imdb_code}
          torrents={torrentData.data.data.movie.torrents}
        />
      )}
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
