import prisma from '@libs/connections/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    // get all warehouses
    if (req.method === 'GET') {
        try {
            const warehouses = await prisma.warehouse.findMany({
                orderBy: {
                    id: 'desc'
                }
            })
            // console.log(warehouses)
            return res.status(200).json(warehouses)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }
    
    // if (req.method === 'POST') {
    //     console.log('post data')
    //     try {
    //         const { ... } = req.body
    //         console.log('request body', req.body)
                
    //         const warehouse = await prisma.warehouse.create({
    //             data: {
    //                 ...
    //             }
    //         })
    //         console.log(warehouse)
    //         return res.status(200).json(warehouse)

    //     } catch (e:any) {
    //         console.log(e)
    //         return res.status(500).json({ message: `${e.status}` })
    //     }
    // }
    // else {
    //     res.setHeader('Allow', ['POST']);
    //     return res
    //         .status(405)
    //         .json({ message: `HTTP method ${req.method} is not supported.` })
    // }
}