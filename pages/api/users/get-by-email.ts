import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/connections/prisma'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const query:any = req.query
    const email:any = query.email
    
    if (req.method === 'GET') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            // console.log(purchases)
            return res.status(200).json(user)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }

    else {
        res.setHeader('Allow', ['POST']);
        return res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` })
    }
}