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

  serachMovie(page: number, genre: number[], keywords: string) {
    const path = `/search/movie?query=${keywords}&page=${page}`
    const customHeaders = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    }

    return this.client.request('GET', path, {}, {}, customHeaders)
  }
}

export default MovieResource
