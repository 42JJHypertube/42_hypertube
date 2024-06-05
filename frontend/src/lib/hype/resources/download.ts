import BaseResource from './base'

class DownloadResource extends BaseResource {
  postDownloadTorrent(
    {
      imdb_id,
      magnetUrl,
    }: {
      imdb_id: string
      magnetUrl: string
    },
    customHeaders: any,
  ) {
    const path = `/movies/torrent/download`

    return this.client.request(
      'POST',
      path,
      { imdbId: imdb_id, magnetUrl },
      {},
      customHeaders,
    )
  }

  getDownloadMovieInfo({ imdb_id }: { imdb_id: string }, customHeaders: any) {
    const path = `/movies/info?imdbId=${imdb_id}`

    return this.client.request('GET', path, {}, {}, customHeaders)
  }
}

export default DownloadResource
