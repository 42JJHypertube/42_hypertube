export const enum LoginViewEnum {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
  FIND_PW = 'find-pw',
}

export type LoginView = 'sign-in' | 'register' | 'find-pw'

export type LoginForm = {
  email: string
  auth: string
  password: string
  code: string
  message: string | null
}
