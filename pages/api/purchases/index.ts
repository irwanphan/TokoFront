import prisma from '@libs/connections/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    // get all purchases
    if (req.method === 'GET') {
        try {
            const purchases = await prisma.purchase.findMany({
                include: {
                    detail: true,
                    shipments: true
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
    
    if (req.method === 'POST') {
        console.log('post data')
        try {
            const { address, city, province, postal, total, note, user, orders } = req.body
            console.log('request body', req.body)
            // console.log(note)
            // console.log(user)s
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email }
            })
            // console.log(existingUser)
            const userId = existingUser?.id
            const userEmail:any = user.email
            console.log(userId)
            console.log(userEmail)
            // NOTE: check orders
            // orders.map((order:any) => {
            //     console.log(order.id)
            // })
                
            if (existingUser) {
                const purchase = await prisma.purchase.create({
                    include: {
                        detail: true
                    },
                    data: {
                        user: {
                            connect: {
                                id: existingUser.id
                            }
                        },
                        userEmail,
                        total,
                        note,
                        shipments: {
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
            }

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