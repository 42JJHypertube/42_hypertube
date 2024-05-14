function getCookieOption() {
  const duration: number = Number(process.env.JWT_ACCESS_DURATION)
  const currentDate = new Date()
  const expireDate = new Date(currentDate.getTime() + duration) // 10000초 후
  const cookieOptions = {
    expires: expireDate,
    secure: true, // HTTPS 연결에서만 쿠키 전송
    httpOnly: true, // JavaScript에서 쿠키 접근 불가
    path: '/',
  }

  return cookieOptions
}

export default getCookieOption
