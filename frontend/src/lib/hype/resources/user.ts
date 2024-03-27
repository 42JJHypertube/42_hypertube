import BaseResource from './base'
import { CustomHeaders } from '../type/common'

class UserResource extends BaseResource {
  getProfile(customHeaders: CustomHeaders) {
    const path = '/users/me'
    return this.client.request('GET', path, {}, {}, customHeaders)
  }
}

export default UserResource
