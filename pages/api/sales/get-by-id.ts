import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/connections/prisma'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const query:any = req.query
    const queryId:any = query.id
    const id = Number(queryId)
    // console.log('query id: ', queryId)
    // console.log('id: ', id)
    
    if (id) {
        if (req.method === 'GET') {
            try {
                const sale = await prisma.sale.findUnique({
                    include: {
                        detail: true,
                        shipment: true,
                    },
                    where: {
                        id: id
                    }
                })
                // console.log(sale)
                return res.status(200).json(sale)
            }
            catch (e) {
                console.log(e)
                return res.status(500).json({ message: `${e}` })
            }
        }
    }
}