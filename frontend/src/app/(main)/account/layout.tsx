export default async function AccountPageLayout({
  userInfo,
  login,
}: {
  userInfo: React.ReactNode
  login: React.ReactNode
}) {
  const isLogined = false

  return <div>{isLogined ? userInfo : login}</div>
}
