import Client from '../client'

class BaseResource {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }
}

export default BaseResource
