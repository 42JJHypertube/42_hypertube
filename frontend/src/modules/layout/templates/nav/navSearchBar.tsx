'use client'

// import useToggleState from '@/lib/hooks/useToggleState'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './navSearchBar.module.scss'

export default function NavSearchBar() {
  const router = useRouter()
  // const [genre, setGenre] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (query.length === 0) return
        router.push(`/search/${query}`)
      }}
      className={styles.search}
    >
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a title..."
      />
    </form>
  )
}
