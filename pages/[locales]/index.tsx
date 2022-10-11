import languageDetector from "@lib/language-detector";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const detectedLng = languageDetector.detect();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${detectedLng}/auth/login`);
    }
    if (status === "authenticated") {
      router.push(`/${detectedLng}/app`);
    }
  }, [router, status, detectedLng]);

  return (
    <></>
  );
};

export default Home;
