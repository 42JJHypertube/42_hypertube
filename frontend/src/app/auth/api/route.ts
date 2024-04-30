import { cookies } from 'next/headers'
import { getProfile, getToken } from '@/lib/data'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('route handler')
  const cookieStore = cookies()
  const access_token = cookieStore.get('access_token')?.value
  const refresh_token = cookieStore.get('refresh_token')?.value

  if (access_token && refresh_token) {
    const cookie = `access_token=${access_token}; refresh_token=${refresh_token}`
    const customHeaders = {
      cookie: cookie,
    }

    const res = await getProfile(customHeaders)
    if (res?.response.status === 401) {
      const res2 = await getToken(customHeaders)
      if (res2.response.status === 200) {
        const newAccess = res2.data.accessToken
        const newRefresh = res2.data.refreshToken
        const response = NextResponse.json({}, { status: 201 })
        response.cookies.set('access_token', newAccess)
        response.cookies.set('refresh_token', newRefresh)
        response.cookies.set('token_changed', 'yes')
        return response
      }
    }
    if (res?.response.status === 200)
      return new Response('OK', {
        status: 200,
      })
  }
  return new Response('No Token Error', {
    status: 404,
  })
}
