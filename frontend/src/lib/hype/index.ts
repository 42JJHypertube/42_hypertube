import { Config } from './type/client'
import Client from './client'
import AuthResource from './resources/auth'
import MovieResource from './resources/movie'
import UserResource from './resources/user'
import TorrentResource from './resources/torrent'
import DownloadResource from './resources/download'

class Hype {
  public client: Client

  public torrent: TorrentResource //

  public movie: MovieResource // movie API를 관리하기 위한 Client

  public auth: AuthResource // 인증관리를 위한 api들

  public user: UserResource // 유저정보 관리를 위한 api들

  public download: DownloadResource // 영화 다운을 위한 api들

  constructor(config: Config) {
    this.client = new Client(config)
    this.auth = new AuthResource(this.client)
    this.user = new UserResource(this.client)
    this.download = new DownloadResource(this.client)
    this.movie = new MovieResource(
      new Client({
        baseURL: `https://api.themoviedb.org/3`,
        maxRetries: 3,
      }),
    )
    this.torrent = new TorrentResource(
      new Client({
        baseURL: `https://yts.mx/api/v2`,
        maxRetries: 3,
      }),
    )
  }
}

export default Hype
