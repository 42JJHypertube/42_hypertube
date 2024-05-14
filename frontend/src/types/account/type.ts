export const enum LoginViewEnum {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
  FIND_PW = 'find-pw',
}

export type LoginView = 'sign-in' | 'register' | 'find-pw'

export type AuthForm = {
  email: string | null
  emailToken: string | null
  codeSended: boolean
  message: string | null
}

export type LoginForm = {
  email: string | null
  loginType: string | null
  message: string | null
  noAccount: boolean
}

export type RegistForm = {
  email: string
  emailToken: string
  message: string | null
  success: boolean
}
