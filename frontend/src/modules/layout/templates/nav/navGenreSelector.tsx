'use client'

import useToggleState from '@/lib/hooks/useToggleState'
import { useState } from 'react'
import { MovieGenres } from '@/types/account/type'
import { useRouter } from 'next/navigation'

export default function NavSearchBar() {
  const router = useRouter()
  const [genre, setGenre] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Movie"
      />
      <button onClick={() => router.push(`/search/${query}`)}> Serach</button>
    </div>
  )
}
