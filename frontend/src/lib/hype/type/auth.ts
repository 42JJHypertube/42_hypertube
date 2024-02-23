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

export type ResCheckEmail = {
  data: {
    emailExist: boolean
    passwordExist: boolean
  }
}
