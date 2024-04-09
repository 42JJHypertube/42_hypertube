import { searchMovie } from "@/modules/layout/templates/nav/action"
import MovieSection from "@/modules/main/components/movieSection"

export default async function SearchResult({
  params,
}: {
  params: { query: string }
}) {
  const res = await searchMovie({query: params.query, pages: 1})

  return (
    <>
      <MovieSection initData={res.data?.results} total_pages={res.data.total_pages} loadFunction={searchMovie} loadParams={{query: params.query, pages: 1}} />
    </>
  )
}
