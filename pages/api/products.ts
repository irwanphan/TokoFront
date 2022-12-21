import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { name, refId, description, price } = req.body;

            // console.log(price)

            const product = await prisma.product.create({
                data: {
                    name,
                    refId,
                    description,
                    price
                },
            });

            console.log(product)
            res.status(200).json(product);
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: `${e}` });
        }
    }
    else {
        res.setHeader('Allow', ['POST']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` });
    }
}