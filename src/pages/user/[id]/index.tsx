import { useRouter } from 'next/router'

const UserPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <h1>TODO: {id}</h1>
    </>
  )
};

export default UserPage;
