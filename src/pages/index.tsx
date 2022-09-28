import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
    if (session?.user) {
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
