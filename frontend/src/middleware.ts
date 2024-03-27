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
    return await response.json()
  } catch (error) {
    return error
  }
}

async function refreshToken(request: NextRequest, allCookies: TypeCookie[]) {
  try {
    const res = await getToken(allCookies)
    if (res.accessToken && res.refreshToken) {
      const response = NextResponse.redirect(request.nextUrl.href)
      const cookieOptions = {
        secure: true, // HTTPS 연결에서만 쿠키 전송
        httpOnly: true, // JavaScript에서 쿠키 접근 불가
      }
      response.cookies.set('refresh_token', res.refreshToken, cookieOptions)
      response.cookies.set('access_token', res.accessToken, cookieOptions)
      return response
    }
    return NextResponse.next()
  } catch (error) {
    const response = NextResponse.redirect(request.nextUrl.href)
    response.cookies.delete('refresh_token')
    response.cookies.delete('access_token')
    return response
  }
}

export async function middleware(request: NextRequest) {
  if (
    request.cookies.has('refresh_token') &&
    request.cookies.has('access_token')
  ) {
    const allCookies = request.cookies.getAll()
    const ping = await getProfile(allCookies)
    if (ping?.status === 401) {
      return refreshToken(request, allCookies)
    } // => true
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/account/:path*',
}
