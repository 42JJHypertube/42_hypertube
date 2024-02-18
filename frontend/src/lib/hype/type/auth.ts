export type ResSendCode = {
  data: {
    code: string
  }
}

export type ResSignIn = {
  data: {
    grantType: string
    accessToken: string
    refreshToken: string
  }
}
