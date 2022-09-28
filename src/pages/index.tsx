import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setCookie } from "cookies-next";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
    if (session?.user) {
      setCookie('token', session.jwt);
      router.push('/app');
    } else {
      router.push('/auth/login');
    }
  }, [session, router]);

  return (
    <></>
  );
};

export default Home;
