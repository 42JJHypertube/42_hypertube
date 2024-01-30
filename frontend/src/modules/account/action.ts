interface RegisterInfo {
  email: string
  username: string
  lastname: string
  firstname: string
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

export async function becauselint() {
  console.log('hello')
}
