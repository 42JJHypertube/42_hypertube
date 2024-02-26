import { checkLogin } from '@/modules/account/action'

export default async function AccountPageLayout({
  userInfo,
  login,
}: {
  userInfo: React.ReactNode
  login: React.ReactNode
}) {
  // const isLogined = await checkLogin()
  // console.log('isLogined dAta', isLogined.data)
  const isLogined = true

  return <div>{!isLogined ? userInfo : login}</div>
}
