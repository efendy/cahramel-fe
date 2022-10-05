import { useRouter } from 'next/router'

export default function CompanyPage() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <h1>TODO: {id}</h1>
    </>
  )
}