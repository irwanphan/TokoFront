import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/connections/prisma'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const settings = await prisma.setting.findMany()
            // console.log(settings)
            return res.status(200).json(settings)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }
    
    if (req.method === 'POST') {
        
        try {
            const {
                settingBusinessName, 
                settingBusinessDescription, 
                settingSalesOrderingModeEnable, 
                settingMainPageMode
            } = req.body

            console.log(settingBusinessName)

            return res.status(200)

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