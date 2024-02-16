/* sigleton으로 Token을 관리하는 Manager */

class TokenManager {
  private jwtToken_access: string | null = null

  private jwtToken_refresh: string | null = null

  registAccessToken(token: string) {
    this.jwtToken_access = token
  }

  registRefreshToken(token: string) {
    this.jwtToken_refresh = token
  }

  getAccessToken() {
    return this.jwtToken_access
  }

  getRefreshToken() {
    return this.jwtToken_refresh
  }
}

export default new TokenManager()
