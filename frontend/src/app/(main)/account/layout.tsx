import { actionWrapper, getProfile } from '@/lib/data'
import { checkLogin } from '@/modules/account/action'

export default async function AccountPageLayout({
  userInfo,
  login,
}: {
  userInfo: React.ReactNode
  login: React.ReactNode
}) {
  const res = await actionWrapper(getProfile)

  return <div>{res.response.status === 200 ? userInfo : login}</div>
}
