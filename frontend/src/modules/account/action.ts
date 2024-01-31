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

  console.log(info)
}

export async function loginUser(currentState: unknown, formData: FormData) {
  const info = {
    id: formData.get('userId'),
    password: formData.get('password'),
  } as LoginInfo

  console.log(info)
}
