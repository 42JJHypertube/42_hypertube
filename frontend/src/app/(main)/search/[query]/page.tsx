import MovieSection from '@/modules/common/components/movieSection'
import { searchMovie } from '@/modules/layout/templates/nav/action'
import { notFound } from 'next/navigation'
import styles from './search.module.scss'

export default async function SearchResult({
  params,
}: {
  params: { query: string }
}) {
  const res = await searchMovie({ query: params.query, pages: 1 })

  if (res.response.status !== 200) return notFound()

  return (
    <div className={styles.search}>
      <MovieSection
        initData={res.data?.results}
        total_pages={res.data.total_pages}
        loadFunction={searchMovie}
        loadParams={{ query: params.query, pages: 1 }}
      />
      <div className={styles.textWrapper}>
        <h2>Search Results For</h2>
        <h3>"{params.query}"</h3>
      </div>
    </div>
  )
}
