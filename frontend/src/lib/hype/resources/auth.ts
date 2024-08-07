import BaseResource from './base'
import { ResSendCode, ResSignIn, ResCheckEmail } from '../type/auth'
import { ResponsePromise, CustomHeaders } from '../type/common'

class AuthResource extends BaseResource {
  /**
   *
   * @param payload {email: }
   * @returns
   */
  sendCode(
    payload: Record<string, string | null>,
    customHeaders?: CustomHeaders,
  ): ResponsePromise<ResSendCode> {
    const path = '/auth/2fa/send-code'
    return this.client.request('POST', path, payload, {}, customHeaders)
  }

  checkEmail(
    payload: Record<string, string | null>,
    customHeaders?: CustomHeaders,
  ): ResponsePromise<ResCheckEmail> {
    const path = `/auth/email-check?email=${payload.email}`
    return this.client.request('GET', path, {}, {}, customHeaders)
  }

  loginEmailToken(
    payload: Record<string, string | null>,
    customHeaders?: CustomHeaders,
  ): ResponsePromise<ResCheckEmail> {
    const path = '/auth/sign-in/email-token'
    return this.client.request('POST', path, payload, {}, customHeaders)
  }

  loginPassword(
    payload: Record<string, string | null>,
    customHeaders?: CustomHeaders,
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
    customHeaders?: CustomHeaders,
  ) {
    const path = `/auth/2fa/verify-code?email=${payload.email}&code=${payload.code}`
    return this.client.request('GET', path, payload, {}, customHeaders)
  }

  signIn(
    payload: Record<string, string | null>,
    customHeaders?: CustomHeaders,
  ): ResponsePromise<ResSignIn> {
    const path = '/auth/sign-in'
    return this.client.request('POST', path, payload, {}, customHeaders)
  }

  makeUser(payload: {
    nickname: string
    email: string
    password: string
    password2: string
    firstName: string
    lastName: string
    imageUrl: string
    emailToken: string
  }) {
    const path = '/auth/sign-up'
    return this.client.request('POST', path, payload)
  }

  checkPermission() {
    const path = '/auth/admin/test'
    return this.client.request('GET', path)
  }

  modifyPassword(payload: {
    password: string
    password2: string
    emailToken: string
  }) {
    const path = '/auth/modify-password'
    return this.client.request('POST', path, payload)
  }

  getAccessToken(customHeaders: CustomHeaders) {
    const path = '/auth/access-token'
    return this.client.request('POST', path, {}, {}, customHeaders)
  }
}

export default AuthResource
