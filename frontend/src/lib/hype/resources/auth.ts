import BaseResource from './base'

import { ResSendCode, ResSignIn } from '../type/auth'
import { ResponsePromise } from '../type/common'

class AuthResource extends BaseResource {
  /**
   *
   * @param payload {email: }
   * @returns
   */
  sendCode(
    payload: Record<string, string | null>,
    customHeaders?: Record<string, string | null>,
  ): ResponsePromise<ResSendCode> {
    const path = '/auth/2fa/signup/send-code'
    return this.client.request('POST', path, payload, {}, customHeaders)
  }

  /**
   *
   * @param payload {email: ,code: }
   * @returns
   */
  verifyCode(
    payload: Record<string, string | null>,
    customHeaders?: Record<string, string | null>,
  ) {
    const path = `/auth/2fa/signup/verify-code?email=${payload.email}&code=${payload.code}`
    return this.client.request('GET', path, payload, {}, customHeaders)
  }

  signIn(
    payload: Record<string, string | null>,
    customHeaders?: Record<string, string | null>,
  ): ResponsePromise<ResSignIn> {
    const path = '/auth/sign-in'
    return this.client.request('POST', path, payload, {}, customHeaders)
  }
}

export default AuthResource
