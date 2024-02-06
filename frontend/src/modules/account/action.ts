'use server'

import { revalidateTag } from 'next/cache'

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

export async function registUser(currentState: unknown, formData: FormData) {
  const info = {
    email: formData.get('email'),
    username: formData.get('username'),
    lastname: formData.get('lastname'),
    firstname: formData.get('firstname'),
    password: formData.get('password'),
  } as RegisterInfo

  revalidateTag('auth')
  console.log(info)
}

export async function loginUser(currentState: unknown, formData: FormData) {
  const info = {
    id: formData.get('id'),
    password: formData.get('password'),
  } as LoginInfo

  revalidateTag('auth')
  console.log(info)
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
