import MovieSection from '@/modules/main/components/movieSection'
import { getMovie } from '@/lib/data'
export default async function Home() {
  const { data, response } = await getMovie(1)

  if (response.status !== 200)
    return <div> Error </div>

  return <MovieSection data={data.results} />
}
