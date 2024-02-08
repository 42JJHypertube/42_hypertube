// import { testAuth } from '@/modules/account/action'

export default async function AccountPageLayout({
  userInfo,
  login,
}: {
  userInfo: React.ReactNode
  login: React.ReactNode
}) {
  // const isLogined = await testAuth()
  const isLogined = true

  console.log('refreshed')
  return <div>{!isLogined ? userInfo : login}</div>
}
