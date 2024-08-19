import { getMovie } from '@/lib/data'
import styles from './main.module.scss'
import MovieRecommnedSection from '@/modules/main/components/movieRecommendSection'

export default async function Home() {
  const { data, response } = await getMovie({ pages: 1 })
  if (response.status !== 200) return <div> Error </div>

  return (
    <div className={styles.main}>
      <MovieRecommnedSection recommnedType="NowPlaying" />
      <MovieRecommnedSection recommnedType="Popular" />
      <MovieRecommnedSection recommnedType="TopRated" />
      <MovieRecommnedSection recommnedType="UpComing" />
    </div>
  )
}