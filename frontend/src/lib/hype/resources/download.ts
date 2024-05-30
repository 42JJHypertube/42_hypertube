import BaseResource from './base'

class DownloadResource extends BaseResource {
    postDownloadTorrent({
        imdb_id,
        magnetUrl,
    }: {
        imdb_id: string
        magnetUrl: string
    }, customHeaders: any) {
        const path = `/movies/torrent/download`

        return this.client.request(
            'POST',
            path,
            { imdbId: imdb_id, magnetUrl },
            {},
            customHeaders,
        )
    }
}

export default DownloadResource
