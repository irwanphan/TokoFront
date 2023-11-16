import prisma from '@libs/connections/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    // get all sales
    if (req.method === 'GET') {
        try {
            const sales = await prisma.sale.findMany({
                include: {
                    detail: true,
                    shipment: true
                },
                orderBy: {
                    id: 'desc'
                }
            })
            // console.log(sales)
            return res.status(200).json(sales)
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
                const sale = await prisma.sale.create({
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
                console.log(sale)
                return res.status(200).json(sale)
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