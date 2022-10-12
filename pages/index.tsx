import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/login`);
    }
    if (status === "authenticated") {
      router.push(`/app`);
    }
  }, [router, status]);

  return (
    <></>
  );
};

export default Home;
