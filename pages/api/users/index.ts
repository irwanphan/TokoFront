import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/connections/prisma'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany({
                orderBy: {
                    id: 'desc'
                }
            })
            // console.log(users)
            return res.status(200).json(users)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }
    
    if (req.method === 'POST') {
        
        try {
            const { id, email, name, image } = req.body

            const existingUser = await prisma.user.findUnique({
                where: { email: email }
            })
            console.log(existingUser)
            if (!existingUser) {
                const user = await prisma.user.create({
                    data: {
                        code: id,
                        email,
                        name,
                        image
                    }
                })
                // console.log(user)
                return res.status(200).json(user)
            }
            return res.status(200).json(existingUser)

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