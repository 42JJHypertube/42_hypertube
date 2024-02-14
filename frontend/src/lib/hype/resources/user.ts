import BaseResource from './base'

class UserResource extends BaseResource {
  makeUser(payload: {
    nickname: string
    email: string
    password: string
    password2: string
    firstName: string
    lastName: string
    imageUrl: string
    token: string
  }) {
    const path = '/users'
    return this.client.request('POST', path, payload)
  }
}

export default UserResource
