import { checkLogin } from '@/modules/account/action'

export default async function AccountPageLayout({
  userInfo,
  login,
}: {
  userInfo: React.ReactNode
  login: React.ReactNode
}) {
  const isLogined = await checkLogin()
  // const isLogined = false

  return <div>{isLogined ? userInfo : login}</div>
}

// export default async function AccountPageLayout({
//   children
// }: {
//   children: ReactNode
// }) {
//   // const isLogined = await checkLogin()
//   // const isLogined = false

//   return <div>{children}</div>
// }
