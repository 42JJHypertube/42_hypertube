import { ResponsePromise } from '../type/common'
import BaseResource from './base'

class MovieResource extends BaseResource {
  getMovieTopRated(): ResponsePromise<unknown> {
    const path = '/movie/top_rated?language=en-US&page=1'
    const customHeaders = {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    }
    return this.client.request('GET', path, customHeaders)
  }
}

export default MovieResource
