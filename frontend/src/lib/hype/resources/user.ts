import BaseResource from './base'
import { cookies } from 'next/headers'

class UserResource extends BaseResource {
  getProfile(customHeaders: any) {
    const path = '/users/me'
    return this.client.request('GET', path, {}, {}, customHeaders)
  }
}

export default UserResource
