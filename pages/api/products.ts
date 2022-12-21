import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    
    const refIdExist = await prisma.product.findUnique({
        where: {
            refId: req.body.refId
        }
    })
    if (refIdExist) {
        // console.log(`Product with reference id ${refIdExist.refId} is already existed`)
        res.status(500).json({ 
            message: `Product with reference id ${refIdExist.refId} is already existed`
        })
    }

    if (req.method === 'POST') {
        try {
            const { name, refId, description, price } = req.body;
                
            const product = await prisma.product.create({
                data: {
                    name,
                    refId,
                    description,
                    price
                },
            })

            console.log(product)
            res.status(200).json(product)

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: `${e}` })
        }
    }
    else {
        res.setHeader('Allow', ['POST']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` })
    }
}