import { Suspense } from 'react'
import {
  getNowPlayingMovie,
  getTopRatedMovie,
  getUpComingMovie,
  getPopularMovie,
} from '@/lib/data'
import LoadingMovieRecommnedSection from './loading'
import MovieRecommendList from '../movieRecommendList'
import styles from './index.module.scss'

type RecommendType = 'NowPlaying' | 'Popular' | 'TopRated' | 'UpComing'

type Props = {
  recommnedType: RecommendType
}

// API에서 주는 Result의 기본 포맷, 나중에 type 위치를 바꿔야할 필요가있을듯.
export type MovieData = {
  adult: boolean // 성인용 콘텐츠 여부
  backdrop_path: string // 배경 이미지 경로
  genre_ids: number[] // 장르 ID 배열
  id: number // 영화 ID
  original_language: string // 원어
  original_title: string // 원제
  overview: string // 줄거리
  popularity: number // 인기 지수
  poster_path: string // 포스터 이미지 경로
  release_date: string // 개봉일 (YYYY-MM-DD 형식)
  title: string // 영화 제목
  video: boolean // 비디오 여부
  vote_average: number // 평균 평점
  vote_count: number // 평점 수
}

function getHeader(type: RecommendType) {
  if (type === 'NowPlaying') return 'Now Playing'
  if (type === 'Popular') return 'Popular'
  if (type === 'TopRated') return 'Top Rated'
  if (type === 'UpComing') return 'UpComing'
}

function getFetchFun(type: RecommendType) {
  if (type === 'NowPlaying') return getNowPlayingMovie
  if (type === 'Popular') return getPopularMovie
  if (type === 'TopRated') return getTopRatedMovie
  if (type === 'UpComing') return getUpComingMovie

  return () =>
    Promise.resolve(Error('getFetchFun Error: Recommend type is invalid'))
}

async function MovieRecommnedContent({
  fetchFun,
}: {
  fetchFun: (page: number) => Promise<any>
}) {
  try {
    const { data, response } = await fetchFun(1)
    if (response.status !== 200) return <div> error ... 새로고침 버튼 </div>

    const movieData = data.results
    return <MovieRecommendList movieData={movieData} />
  } catch (e) {
    console.log(e)
    return <div> error ... 새로고침 버튼 </div>
  }
}

function MovieRecommnedSection({ recommnedType }: Props) {
  const header = getHeader(recommnedType)
  const fetchFun = getFetchFun(recommnedType)

  return (
    <section className={styles.section}>
      <header className={styles.header}> {header} </header>
      <Suspense fallback={<LoadingMovieRecommnedSection />}>
        <MovieRecommnedContent fetchFun={fetchFun} />
      </Suspense>
    </section>
  )
}

export default MovieRecommnedSection
