import BaseResource from './base'
import { ResponsePromise, CustomHeaders } from '../type/common'
import { ResGetProfile } from '../type/user'

class UserResource extends BaseResource {
  getProfile(customHeaders: CustomHeaders): ResponsePromise<ResGetProfile> {
    const path = '/users/me'
    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  changeProfile(customHeaders: CustomHeaders, payload: Blob) {
    const path = '/users/me/profile-image'
    return this.client.request('POST', path, payload, {}, customHeaders)
  }
}

export default UserResource
