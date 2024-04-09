import { searchMovie } from "@/modules/layout/templates/nav/action"
import MovieSection from "@/modules/main/components/movieSection"
import { notFound } from "next/navigation"

export default async function SearchResult({
  params,
}: {
  params: { query: string }
}) {
  const res = await searchMovie({query: params.query, pages: 1})

  if (res.response.status !== 200)
    return notFound()

  return (
    <>
      <MovieSection initData={res.data?.results} total_pages={res.data.total_pages} loadFunction={searchMovie} loadParams={{query: params.query, pages: 1}} />
    </>
  )
}
