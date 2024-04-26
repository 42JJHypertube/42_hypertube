export const enum LoginViewEnum {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
  FIND_PW = 'find-pw',
}

export type LoginView = 'sign-in' | 'register' | 'find-pw'

export type AuthForm = {
  email: string | null
  emailToken: string | null
  code: string | null
  codeSended: boolean
  message: string | null
}

export type LoginForm = {
  email: string | null
  loginType: 'password' | 'email' | null
  password: string | null
  emailToken: string | null
  message: string | null
}

export type RegistForm = {
  nickname: string
  email: string
  password: string
  password2: string
  firstName: string
  lastName: string
  imageUrl: string
  emailToken: string
  message: string | null
  success: boolean;
}
