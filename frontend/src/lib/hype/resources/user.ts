import Client from '../client'

class UserResource {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }
}

export default UserResource
