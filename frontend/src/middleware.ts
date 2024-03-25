import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type TypeCookie = {
  name: string
  value: string
}

async function getToken(cookies: TypeCookie[]) {
  const cookieHeader = cookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  const url = 'https:localhost/api/auth/access-token'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    // body: JSON.stringify(data),
  }

  try {
    const response = await fetch(url, options)
    return await response.json()
  } catch (error) {
    return error
  }
}

export async function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API

  const response = NextResponse.next()
  if (
    request.cookies.has('refresh_token') &&
    request.cookies.has('access_token')
  ) {
    const allCookies = request.cookies.getAll()
    const res = await getToken(allCookies)
    console.log('res:', res)
    if (res.access_token) {
      response.cookies.set('refresh_token', res.data.refreshToken)
      response.cookies.set('access_token', res.data.accessToken)
      response.cookies.set('new_token_set', 'true')
    }
  } // => true

  return response
}

export const config = {
  matcher: '/account/:path',
}
