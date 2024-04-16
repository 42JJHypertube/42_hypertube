'use server'

import { serachMovie } from '@/lib/data'

export async function searchMovie({
  query,
  pages,
}: {
  query: string
  pages: number
}) {
  return await serachMovie({ query: query, pages: pages, genre: [] })
    .then((res) => res)
    .catch((error) => error)
}
