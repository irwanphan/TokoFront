import prisma from '@libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    // const session = await getSession({ req })
    // console.log('running api')
    // if (!session) {
    //     return res.status(401).json({ message: 'Unauthorized.' });
    // }

    // get all purchases
    if (req.method === 'GET') {
        try {
            const purchases = await prisma.purchase.findMany({
                include: {
                    detail: true,
                    shipment: true,
                },
                orderBy: {
                    id: 'desc'
                }
            })
            // const updateData = purchases.map((purchase) => {
            //     typeof purchase === 'bigint' ? purchase = purchase.toString() : purchase
            // })
            // console.log('purchases', updateData)
            return res.send(purchases)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }
    
    if (req.method === 'POST') {
        console.log('post data')
        try {
            const { address, city, province, postal, total, note, user, orders } = req.body
            console.log('request body', req.body)
            // console.log(note)
            // console.log(user)s
            const qUser = await prisma.users.findUnique({
                where: { email: user.email }
            })
            // console.log(qUser)
            const userId = qUser?.id
            const userEmail:any = user.email
            console.log(userId)

            // orders.map((order:any) => {
            //     console.log(order.id)
            // })
                
            const purchase = await prisma.purchase.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    userEmail,
                    total,
                    note,
                    shipment: {
                        create: {
                            address,
                            city,
                            province,
                            postal
                        }
                    },
                    detail: {
                        create: orders.map((order:any) => ({
                                productId: order.id,
                                purchasePrice: order.price,
                                qty: order.quantity,
                                unit: 'piece'
                        })),
                    }
                    // createdAt: ((new Date()).toISOString()).toLocaleString()
                }
            })
            console.log(purchase)
            return res.status(200).json(purchase)

        } catch (e:any) {
            console.log(e)
            return res.status(500).json({ message: `${e.status}` })
        }
    }
    else {
        res.setHeader('Allow', ['POST']);
        return res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` })
    }
}