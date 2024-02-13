import Client from '../client'

class BaseResource {
  public client: Client

  constructor(client: Client) {
    this.client = client
  }
}

export default BaseResource
