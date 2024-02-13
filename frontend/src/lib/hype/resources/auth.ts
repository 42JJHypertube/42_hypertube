import BaseResource from './base'

class AuthResource extends BaseResource {
  /**
   *
   * @param payload {email: }
   * @returns
   */
  sendCode(
    payload: Record<string, string | null>,
    customHeaders?: Record<string, string | null>,
  ): Promise<unknown> {
    const path = '/auth/2fa/signup/send-code'
    return this.client.request('POST', path, payload, {}, customHeaders)
  }

  /**
   *
   * @param payload {email: ,code: }
   * @returns
   */
  verifyCode(payload: Record<string, string | null>) {
    const path = '/auth/2fa/signup/verify-code'
    return this.client.request('GET', path, payload)
  }

  goLogin(
    payload: Record<string, string | null>,
    customHeaders?: Record<string, string | null>,
  ): Promise<unknown> {
    const path = 'auth/login'
    return this.client.request('POST', path, payload, {}, customHeaders)
  }
}

export default AuthResource
