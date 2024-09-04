'use client'

import { MovieData } from '../movieRecommendSection'
import MovieCard from '@/modules/common/components/movieCard'
import Slide from '@/modules/common/components/slide'

type Props = {
  movieData: MovieData[]
}

const getKeyAndProps = (data: MovieData) => {
  const { id, title, poster_path } = data
  return { key: id, props: { title, imgUrl: poster_path, movie_id: id } }
}

function calcViewCount() {
  if (typeof window === 'undefined') return 4
  const width = document.documentElement.clientWidth
  if (1080 <= width) return 6
  return 4
}

export default function MovieRecommendList({ movieData }: Props) {
  return (
    <Slide
      contentData={movieData}
      ContentComponent={MovieCard}
      getKeyAndProps={getKeyAndProps}
      getViewCount={calcViewCount}
    />
  )
}
