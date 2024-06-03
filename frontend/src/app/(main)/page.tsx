import MovieSection from '@/modules/common/components/movieSection'
import { getMovie } from '@/lib/data'
import styles from './main.module.scss'

export default async function Home() {
  const { data, response } = await getMovie({ pages: 1 })
  if (response.status !== 200) return <div> Error </div>

  return (
    <div className={styles.main}>
      <MovieSection
        initData={data.results}
        total_pages={data.total_pages}
        loadFunction={getMovie}
        loadParams={{ pages: 1 }}
      />
    </div>
  )
}
