import prisma from '@libs/connections/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    // get all purchases
    if (req.method === 'GET') {
        try {
            const purchases = await prisma.purchase.findMany({
                include: {
                    detail: true,
                    // shipment: true
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
            const { warehouseId, received, receivedBy, total, note, user, orders } = req.body
            // console.log('request body', req.body)
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
                        shipment: {
                            create: {
                                warehouse: {
                                    connect: {
                                        id: warehouseId,
                                    },
                                },
                                received: received,
                                receivedBy,
                                note: '' // NOTE: add note for warehouse here
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

                // const productUpdate = orders.map((order: any) => ({
                //     where: { id: order.id },
                //     update: {
                //         currentStock: { increment: order.quantity },
                //         lastPurchasePrice: order.lastPurchasePrice,  // Update last purchase price here
                //     },
                // }))

                // const productUpdates = await prisma.product.updateMany({
                //     data: productUpdate
                // })

                const productUpdates = await Promise.all(orders.map(async (order: any) => {
                    const productUpdate = await prisma.product.update({
                        where: { id: order.id },
                        data: {
                            currentStock: { increment: order.quantity },
                            lastPurchasePrice: order.lastPurchasePrice,
                            updatedAt: ((new Date()).toISOString()).toLocaleString()
                        },
                    });
                  
                    return productUpdate;
                }));
                
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