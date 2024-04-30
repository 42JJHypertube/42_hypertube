import { getMovieDetail } from '@/lib/data'
import { notFound } from 'next/navigation'

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
    <>
      <p> title: {data.original_title}</p>
      <p> release_date: {data.release_date}</p>
      <p> runtime: {data.runtime}</p>
      <p> tagLine: {data.tagline}</p>
      <p> vote_average: {data.vote_average}</p>
      <p> vote_count: {data.vote_count}</p>
    </>
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