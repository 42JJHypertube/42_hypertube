export const enum LoginViewEnum {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
  FIND_PW = 'find-pw',
}

export type LoginView = 'sign-in' | 'register' | 'find-pw'

export type AuthSequence =
  | 'login-email'
  | 'login-password'
  | 'login-code'
  | 'regist-email'
  | 'regist-auth'
  | 'regist-form'
  | 'resetPw-email'
  | 'resetPw-auth'
  | 'resetPw-setPw'

export type AuthForm = {
  state: AuthSequence
  nickname: string
  email: string
  password: string
  password2: string
  firstName: string
  lastName: string
  imageUrl: string
  emailToken: string
  code: string
  message: string | null
}
