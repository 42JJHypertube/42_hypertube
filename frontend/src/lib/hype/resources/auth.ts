import BaseResource from './base'

import { ResSendCode, ResSignIn, ResCheckEmail } from '../type/auth'
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

  checkEmail(
    payload: Record<string, string | null>,
    customHeaders?: Record<string, string | null>,
  ): ResponsePromise<ResCheckEmail> {
    const path = `/auth/email-check?email=${payload.email}`
    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  loginEmailToken(
    payload: Record<string, string | null>,
    customHeaders?: Record<string, string | null>,
  ): ResponsePromise<ResCheckEmail> {
    const path = '/auth/sign-in/email-token'
    return this.client.request('POST', path, payload, {}, customHeaders)
  }

  loginPassword(
    payload: Record<string, string | null>,
    customHeaders?: Record<string, string | null>,
  ): ResponsePromise<ResCheckEmail> {
    const path = '/auth/sign-in/password'
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
