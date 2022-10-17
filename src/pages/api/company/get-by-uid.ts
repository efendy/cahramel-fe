import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});
  const token = await getToken({req});
  console.log('get-by-uid session', session);
  console.log('get-by-uid token', token);
  if (req.method === "GET") {
    const { uid } = req.query;
    try {
      return res.status(200).end();
    } catch (err: any) {
      return res.status(503).json({error: err.toString()});
    }
  } else {
    return res.status(405).json({error: "This request only supports POST requests"});
  }
};

export default handler;
