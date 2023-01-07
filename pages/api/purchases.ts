import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: 'Unauthorized.' });
    // }

    if (req.method === 'GET') {
        // TODO: get specific purchase, or just leave it to global state
        // get all purchases
        try {
            const purchases = await prisma.purchase.findMany({
                // orderBy: { name: 'name' }
            })
            console.log(purchases)
            res.status(200).json(purchases)
            return purchases
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ message: `${e}` })
        }
    }
    
    if (req.method === 'POST') {
        // const refIdExist = await prisma.product.findUnique({
        //     where: {
        //         refId: req.body.refId
        //     }
        // })
        // if (refIdExist) {
        //     // console.log(`Product with reference id ${refIdExist.refId} is already existed`)
        //     res.status(500).json({ 
        //         message: `Product with reference id ${refIdExist.refId} is already existed`
        //     })
        // }
        // else
        // {
            try {
                const { name, refId, description, price, currentStock } = req.body;
                    
                const product = await prisma.product.create({
                    data: {
                        name,
                        refId,
                        description,
                        price,
                        currentStock
                    },
                })
                // console.log(product)
                res.status(200).json(product)

            } catch (e) {
                console.log(e)
                res.status(500).json({ message: `${e}` })
            }
        // }
    }
    else {
        res.setHeader('Allow', ['POST']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` })
    }
}