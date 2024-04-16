import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookieOption } from './lib/utill/cookieOption'

type TypeCookie = {
  name: string
  value: string
}

async function getToken(cookies: TypeCookie[]) {
  const cookieHeader = cookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  const url = `https://localhost/api/auth/access-token`
  const options = {
    method: 'POST',
    cache: 'no-store' as RequestCache,
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

async function getProfile(cookies: TypeCookie[]) {
  const cookieHeader = cookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  const url = `https://localhost/api/users/me`
  const options = {
    method: 'GET',
    cache: 'no-store' as RequestCache,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    // body: JSON.stringify(data),
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return { data: data, response: { status: response.status } }
  } catch (error) {
    return { data: error, response: { status: 500 } }
  }
}

async function refreshToken(request: NextRequest, allCookies: TypeCookie[]) {
  try {
    const res = await getToken(allCookies)
    if (res.accessToken && res.refreshToken) {
      const response = NextResponse.redirect(request.nextUrl.href)
      const cookieOptions = getCookieOption()

      response.cookies.set('refresh_token', res.refreshToken, cookieOptions)
      response.cookies.set('access_token', res.accessToken, cookieOptions)
      return response
    }
    const url = request.nextUrl.clone()
    url.pathname = '/account'
    const response = NextResponse.redirect(url)
    response.cookies.delete('refresh_token')
    response.cookies.delete('access_token')
    return response
  } catch (error) {
    const url = request.nextUrl.clone()
    url.pathname = '/account'
    const response = NextResponse.redirect(url)
    response.cookies.delete('refresh_token')
    response.cookies.delete('access_token')
    return response
  }
}

export async function middleware(request: NextRequest) {
  console.log('run middleware')
  if (
    request.cookies.has('refresh_token') &&
    request.cookies.has('access_token')
  ) {
    const allCookies = request.cookies.getAll()
    const ping = await getProfile(allCookies)
    if (ping?.response.status === 401) {
      return refreshToken(request, allCookies)
    }
    if (ping?.response.status !== 200) {
      const url = request.nextUrl.clone()
      url.pathname = '/account'
      const response = NextResponse.redirect(url)
      response.cookies.delete('refresh_token')
      response.cookies.delete('access_token')
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/account/:path*',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
