import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@libs/connections/prisma'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    const query:any = req.query
    const queryId:any = query.id
    const id = Number(queryId)
    // console.log('query id: ', queryId)
    // console.log('id: ', id)
    
    if (id) {
        if (req.method === 'GET') {
            try {
                const purchase = await prisma.purchase.findUnique({
                    include: {
                        detail: true,
                        shipment: true,
                    },
                    where: {
                        id: id
                    }
                })
                // console.log(purchase)
                return res.status(200).json(purchase)
            }
            catch (e) {
                console.log(e)
                return res.status(500).json({ message: `${e}` })
            }
        }
    }
}