import { client } from '@utils/api-client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req })
    if (req.method !== 'GET' || token == null) {
        return res.status(405).json({ error: { message: 'Invalid request' } })
    }
    // console.log('tttt', token)
    try {
        const user = await client('user-profiles/me', 'GET', {
            token: token.jwt as string
        })
        console.log('uereere', token)
        const contract = await client(
            `user-contracts?filters[user_profile]=${user.id}`,
            'GET',
            {
                token: token.jwt as string
            }
        )
        console.log('here 10')
        let userContract = null
        if (contract?.data?.length > 0) {
            const cData = contract.data[0]
            userContract = { ...cData?.attributes, id: cData.id }
        }
        console.log('here 20', { ...user.attributes, id: user.id, contract: userContract })
        // console.log({ ...user.attributes, id: user.id, contract: userContract })
        return res
            .status(200)
            .json({ ...user.attributes, id: user.id, contract: userContract })
    } catch (err: any) {
        return res.status(503).json(err)
    }
}

export default handler
