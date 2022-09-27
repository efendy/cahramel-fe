import Layout from "@/components/layouts/layout";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Layout><Link href={"/login"}>Continue</Link></Layout>
    </>
  );
};

export default Home;
