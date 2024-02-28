import BaseResource from './base'

class UserResource extends BaseResource {
  getProfile() {
    const path = '/users/me'
    return this.client.request('GET', path)
  }
}

export default UserResource
