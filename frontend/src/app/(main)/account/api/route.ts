import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')
  const refreshToken = cookieStore.get('refresh_token')

  console.log('=============== request =============')
  console.log(request)
  console.log('=====================================')

  return new Response('Hello, Next.js!', {
    status: 200,
  })
}
