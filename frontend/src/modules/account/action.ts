'use server'

interface RegisterInfo {
  email: string
  username: string
  lastname: string
  firstname: string
  password: string
}

interface LoginInfo {
  id: string
  password: string
}

export type LoginFormInfo = {
  auth_token: string | null
}

export type RegisterFormInfo = {
  auth_token: string | null
}

export async function registUser(
  currentState: RegisterFormInfo,
  formData: FormData,
) {
  const info = {
    email: formData.get('email'),
    username: formData.get('username'),
    lastname: formData.get('lastname'),
    firstname: formData.get('firstname'),
    password: formData.get('password'),
  } as RegisterInfo

  console.log(info)

  if (!currentState.auth_token) {
    console.log('check 2fa')
    return {
      auth_token: 'iamtoken',
    }
  }

  return {
    auth_token: null,
  }
}

export async function loginUser(
  currentState: LoginFormInfo,
  formData: FormData,
) {
  const info = {
    id: formData.get('id'),
    password: formData.get('password'),
  } as LoginInfo

  console.log(info)
  // if auth_token is null => check 2fa first;
  if (!currentState.auth_token) {
    console.log('get auth_token')
    return {
      auth_token: 'hello',
    }
  }

  // if have auth_token do login logic
  return {
    auth_token: null,
  }
}

export async function confirm2FA(currentState: unknown, formData: FormData) {
  const info = {
    code: formData.get('code'),
  }
  console.log(info)
}

export async function testAuth() {
  const ret = await fetch(
    'https://92af7888-f61c-4352-afe5-4941e8a2905b.mock.pstmn.io/auth',
    { next: { tags: ['auth'] } },
  )
    .then((res) => res.json())
    .catch(() => console.log('error'))
  console.log(ret)
  return ret
}
