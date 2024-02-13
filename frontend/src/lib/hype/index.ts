import Client, { Config } from './client'
import AuthResource from './resources/auth'
import UserResource from './resources/user'

class Hype {
  public client: Client

  public auth: AuthResource // 인증관리를 위한 api들

  public user: UserResource // 유저정보 관리를 위한 api들

  constructor(config: Config) {
    this.client = new Client(config)
    this.auth = new AuthResource(this.client)
    this.user = new UserResource(this.client)
  }
}

export default Hype
