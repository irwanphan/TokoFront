import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@libs/prisma'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    const query:any = req.query
    const email:any = query.email
    
    // get all purchases
    if (email) {
        if (req.method === 'GET') {
            try {
                const user = await prisma.users.findUnique({
                    where: {
                        email: email
                    }
                })
                // console.log(purchases)
                return res.status(200).json(user)
            }
            catch (e) {
                console.log(e)
                return res.status(500).json({ message: `${e}` })
            }
        }
    }

    if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany({
                orderBy: {
                    id: 'desc'
                }
            })
            console.log(users)
            return res.status(200).json(users)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }
    
    // if (req.method === 'POST') {
        
    //     try {
    //         const { address, city, province, postal, total, user, orders } = req.body

    //         // console.log(user)
    //         const qUser = await prisma.users.findUnique({
    //             where: { email: user.email }
    //         })
    //         // console.log(qUser)
    //         const userId = qUser?.id
    //         const userEmail:any = user.email

    //         // orders.map((order:any) => {
    //         //     console.log(order.id)
    //         // })
                
    //         const purchase = await prisma.purchase.create({
    //             data: {
    //                 user: {
    //                     connect: {
    //                         id: userId
    //                     }
    //                 },
    //                 userEmail,
    //                 total,
    //                 shipment: {
    //                     create: {
    //                         address,
    //                         city,
    //                         province,
    //                         postal
    //                     }
    //                 },
    //                 detail: {
    //                     create: orders.map((order:any) => ({
    //                             productId: order.id,
    //                             purchasePrice: order.price,
    //                             qty: order.quantity,
    //                             unit: 'piece'
    //                     })),
    //                 }
    //                 // createdAt: ((new Date()).toISOString()).toLocaleString()
    //             }
    //         })
    //         // console.log(purchase)
    //         return res.status(200).json(purchase)

    //     } catch (e:any) {
    //         console.log(e)
    //         return res.status(500).json({ message: `${e.status}` })
    //     }
    // }
    else {
        res.setHeader('Allow', ['POST']);
        return res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` })
    }
}