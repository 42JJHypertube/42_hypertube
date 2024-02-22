import { getMovie } from '@/lib/data'
import styles from './main.module.scss'

export default async function Home() {
  const ret = await getMovie()

  if (ret.response.status !== 200) return <div> Error </div>

  const movieInfo = ret.data.results

  return (
    <div className={styles.main}>
      <h1>Main</h1>
      {movieInfo.map((info: Record<string, string>) => (
        <div key={info.id}> {info.original_title}</div>
      ))}
    </div>
  )
}
