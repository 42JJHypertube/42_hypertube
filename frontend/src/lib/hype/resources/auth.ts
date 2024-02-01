import Client from '../client'

class AuthResource {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }
}

export default AuthResource
