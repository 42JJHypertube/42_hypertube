import Nav from '@/modules/layout/templates/nav'

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {props.children}
    </>
  )
}
