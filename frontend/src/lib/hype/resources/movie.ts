import { ResponsePromise } from '../type/common'
import { ResGetMovieTopRated } from '../type/movie'
import BaseResource from './base'

class MovieResource extends BaseResource {
  getMovieTopRated(page: number): ResponsePromise<ResGetMovieTopRated> {
    const path = `/movie/top_rated?language=en-US&page=${page}`
    const customHeaders = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    }

    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  getMovieNowPalying(page: number) {
    const path = `/movie/now_playing?language=en-US&page=${page}`
    const customHeaders = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    }

    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  getMoviePopular(page: number) {
    const path = `/movie/popular?language=en-US&page=${page}`
    const customHeaders = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    }

    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  getMovieUpcoming(page: number) {
    const path = `/movie/upcoming?language=en-US&page=${page}`
    const customHeaders = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    }

    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  serachMovie(page: number, genre: number[], keywords: string) {
    const path = `/search/movie?query=${keywords}&page=${page}`
    const customHeaders = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    }

    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  getMovieDetail({ movie_id }: { movie_id: number }) {
    const path = `/movie/${movie_id}`

    const customHeaders = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    }

    return this.client.request('GET', path, {}, {}, customHeaders)
  }
}

export default MovieResource
