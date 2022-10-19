import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log('hello:', req.query, req.body);
  res.status(200).json({
    name: 'Hello World!',
    // message: JSON.stringify(req. || {}),
  });
}

export default handler;
