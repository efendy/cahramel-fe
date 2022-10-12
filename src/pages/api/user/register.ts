import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('api/user/register', req);
  if (req.method === "POST") {
    let result;
    const {first_name, last_name, email, password} = req.body;
    try {
      result = await fetch(`${process.env.STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          email, 
          password, 
          first_name, 
          last_name
        }),
      });
      const responseData = await result.json();
      return res.status(result.status).json(responseData);
    } catch (err: any) {
      if (result) {
        return res.status(result.status).json({error: {message: result.statusText}});
      }
      return res.status(503).json({error: {message: err.toString()}});
    }
  } else {
    return res.status(405).json({error: {message: "This request only supports POST requests"}});
  }
};

export default handler;
