import { getMovie } from '@/lib/data'
import styles from './main.module.scss'
import MovieRecommnedSection from '@/modules/main/components/movieRecommendSection'
import BillBoard from '@/modules/main/components/BillBoard.tsx'

export default async function Home() {
  const { data, response } = await getMovie({ pages: 1 })
  if (response.status !== 200) return <div> Error </div>

  return (
    <div className={styles.main}>
      <BillBoard />
      <MovieRecommnedSection recommnedType="NowPlaying" />
      {/* <MovieRecommnedSection recommnedType="Popular" />
      <MovieRecommnedSection recommnedType="TopRated" />
      <MovieRecommnedSection recommnedType="UpComing" /> */}
    </div>
  )
}
