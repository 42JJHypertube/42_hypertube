import BaseResource from './base'

class TorrentResource extends BaseResource {
  getTopCountDonwload(imdb_id: number) {
    const path = `/movie_details.json?imdb_id=${imdb_id}`
    const customHeaders = {
      accept: 'application/json',
    }

    return this.client.request('GET', path, {}, {}, customHeaders)
  }
}

export default TorrentResource
