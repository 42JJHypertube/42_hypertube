export const enum LoginViewEnum {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
  FIND_PW = 'find-pw',
}

export type LoginView = 'sign-in' | 'register' | 'find-pw'
export type LoginType = 'email' | 'password'
export type AuthForm = {
  email: string | null
  emailToken: string | null
  codeSended: boolean
  message: string | null
}

export type LoginForm = {
  loginType: LoginType | null
  email: string | null
  message: string | null
  emailToken: string | null // Email 인증을 받았는지 확인하는 토큰
  codeSended: boolean // Email 인증 code를 보냈는지?
  noAccount: boolean
}
export type RegistStatus =
  | 'INPUT_EMAIL'
  | 'WAITING_VERIFICATION'
  | 'AUTHENTICATED'
  | 'COMPLETED'

export type RegistForm = {
  email: string
  emailToken: string
  message: string | null
  status: RegistStatus
}
