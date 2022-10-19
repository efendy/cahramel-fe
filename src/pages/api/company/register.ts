import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { firstName, lastName } = req.body;
    try {
      return res.status(200).end({ firstName, lastName });
    } catch (err: any) {
      return res.status(503).json({ error: err.toString() });
    }
  } else {
    return res.status(405).json({ error: "This request only supports POST requests" });
  }
};

export default handler;
