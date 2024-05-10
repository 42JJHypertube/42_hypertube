import BaseResource from './base'
import { ResponsePromise, CustomHeaders } from '../type/common'
import { ResGetProfile } from '../type/user'

class UserResource extends BaseResource {
  getProfile(customHeaders: CustomHeaders): ResponsePromise<ResGetProfile> {
    const path = '/users/me'
    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  changeProfile(customHeaders: CustomHeaders, payload: FormData) {
    const path = '/users/me/profile-image'
    const newCustomHeaders = {
      ...customHeaders,
      Accept: '*/*',
      withCredentials: true,
      'Content-Type': 'multipart/form-data' as string,
    }
    return this.client.request('POST', path, payload, {}, newCustomHeaders)
  }
}

export default UserResource
