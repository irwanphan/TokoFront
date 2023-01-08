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
                const { address, city, province, postal, user, orders } = req.body

                console.log(user)

                const userId = 'c1e2cdb9-9285-4483-9856-6068da672c82'
                // console.log(userId)
                const checkuser = await prisma.users.findMany({
                    where: {
                        id: userId
                    }
                })
                console.log(checkuser)

                // TODO: TEMP: use irwanphan user id
                const userEmail:any = user.email
                // console.log(userEmail)

                const total = 10000
                // console.log(total)
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
                        shipment: {
                            create: {
                                address,
                                city,
                                province,
                                postal
                            }
                        },
                        detail: {
                            create: 

                                orders.map((order:any) => ({
                                    productId: order.id,
                                    purchasePrice: order.price,
                                    qty: order.quantity,
                                    unit: 'piece'
                                })),
                            

                        },
                    },
                })
                // console.log(purchase)
                // res.status(200).json(purchase)

            } catch (e:any) {
                console.log(e)
                res.status(500).json({ message: `${e.status}` })
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