'use server'

import { serachMovie } from '@/lib/data'

export async function searchMovie({
  query,
  pages,
}: {
  query: string
  pages: number
}) {
  const ret = await serachMovie({ query, pages, genre: [] })
    .then((res) => res)
    .catch((error) => error)

  return ret
}
