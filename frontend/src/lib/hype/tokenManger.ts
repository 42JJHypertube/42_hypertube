/* sigleton으로 Token을 관리하는 Manager */

class TokenManager {
  private jwtToken: string | null = null

  registJwt(token: string) {
    this.jwtToken = token
  }

  getJwt() {
    return this.jwtToken
  }
}

export default new TokenManager()
