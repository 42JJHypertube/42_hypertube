import { getProfile } from '@/lib/data'

export default async function AccountPageLayout({
  userInfo,
  login,
}: {
  userInfo: React.ReactNode
  login: React.ReactNode
}) {
  const res = await getProfile()

  return <div>{res.response.status === 200 ? userInfo : login}</div>
}
