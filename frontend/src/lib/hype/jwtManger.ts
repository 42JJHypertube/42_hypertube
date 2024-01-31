/* sigleton으로 JWT Token을 관리하는 Manager */

class JwtManager {
  private jwtToken: string | null = null

  registJwt(token: string) {
    this.jwtToken = token
  }

  getJwt() {
    return this.jwtToken
  }
}

export default new JwtManager()
