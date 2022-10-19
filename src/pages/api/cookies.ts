import { NextApiRequest, NextApiResponse } from "next";
// import { getToken } from "next-auth/jwt";

// const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  // USE THIS FOR STRAPI API CALL
  // const token = await getToken({ req, secret });
  // console.log("JSON Web Token", token);

  res.end();
}

export default handler;
