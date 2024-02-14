import { getAuthCode, goLogin, veriftyAuthCode, makeUser } from '@/lib/data'

interface RegisterInfo {
  email: string
  nickname: string
  lastName: string
  firstName: string
  password: string
  password2: string
  code: string
}

interface LoginInfo {
  email: string
  password: string
}

export type LoginFormInfo = {
  email: string
  password: string
  error_message: string | null
  token: string | null
}

export type RegisterFormInfo = {
  email: string
  nickname: string
  lastName: string
  firstName: string
  password: string
  password2: string
  error_message: string | null
  code: string | null
  token: string | null
}

export async function registUser(
  currentState: RegisterFormInfo,
  formData: FormData,
) {
  const formInfo = {
    email: formData.get('email'),
    nickname: formData.get('nickname'),
    lastName: formData.get('lastname'),
    firstName: formData.get('firstname'),
    password: formData.get('password1'),
    password2: formData.get('password2'),
    code: formData.get('code'),
  } as RegisterInfo

  const currentInfo = {
    nickname: currentState.nickname,
    email: currentState.email,
    password: currentState.password,
    password2: currentState.password2,
    firstName: currentState.firstName,
    lastName: currentState.lastName,
  }

  if (!currentState.token) {
    const payload = {
      email: formInfo.email,
    }

    const ret = await getAuthCode(payload)
      .then((res) => res?.response)
      .catch(() => 'error')

    console.log(ret)
    return {
      ...formInfo,
      error_message: null,
      code: null,
      token: 'true',
    }
  }

  const ret = await veriftyAuthCode({
    email: currentState.email,
    code: formData.get('code') as string,
  })
    .then((res) => res)
    .catch(() => 'errror')

  console.log(ret)
  console.log(currentInfo.email)

  if (ret.response.status === 200) {
    const ret2 = await makeUser({
      ...currentInfo,
      token: ret.data,
      imageUrl: '',
    })
    if (ret2.response.status === 200) console.log('make User Success')
  }

  return {
    ...currentInfo,
    error_message: '2FA 중 에러가 발생했습니다.',
    code: null,
    token: null,
  }
}

export async function loginUser(
  currentState: LoginFormInfo,
  formData: FormData,
) {
  // if token is null => check 2fa first;
  if (!currentState.token) {
    const info = {
      email: formData.get('email'),
      password: formData.get('password'),
    } as LoginInfo

    // const ret = await getAuthCode({email: info.email}).then((res) => res).catch(() => "error")

    const ret = await goLogin({ email: info.email, password: info.password })
      .then((res) => res)
      .catch(() => 'login Error')

    console.log('login : ', ret)
    return {
      email: info.email,
      password: info.password,
      error_message: null,
      token: 'hello',
    }
  }

  // if have token do login logic
  return {
    email: currentState.email,
    password: currentState.password,
    error_message: null,
    token: null,
  }
}
