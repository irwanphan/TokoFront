import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/connections/prisma'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const query:any = req.query
    const keyword:any = query.keyword
    
    // console.log(keyword)

    if (req.method === 'GET') {
        try {
            const products = await prisma.product.findMany({
                where: {
                    name: {
                        contains: keyword,
                        mode: 'insensitive'
                    }
                }
            })
            // console.log(products)
            return res.status(200).json(products)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }

}