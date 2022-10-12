import { useRouter } from 'next/router'

const CompanyPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <h1>TODO: {id}</h1>
    </>
  )
};

export default CompanyPage;
