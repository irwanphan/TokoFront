import prisma from '@libs/connections/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const query:any = req.query
    const userId:any = query.userId
    
    // get all purchases
    if (req.method === 'GET') {
        try {
            const purchases = await prisma.purchase.findMany({
                include: {
                    detail: true,
                    shipment: true
                },
                orderBy: {
                    id: 'desc'
                }
            })
            // console.log(purchases)
            return res.status(200).json(purchases)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }
}