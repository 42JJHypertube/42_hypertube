import Client, { Config } from './client'

class Hype {
  public client: Client

  constructor(config: Config) {
    this.client = new Client(config)
  }
}

export default Hype
