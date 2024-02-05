/* sigleton으로 Token을 관리하는 Manager */

class TokenManager {
  private jwtToken: string | null = null

  private twoFAToken: string | null = null

  regist2FA(token: string) {
    this.twoFAToken = token
  }

  registJwt(token: string) {
    this.jwtToken = token
  }

  get2FA() {
    return this.twoFAToken
  }

  getJwt() {
    return this.jwtToken
  }
}

export default new TokenManager()
