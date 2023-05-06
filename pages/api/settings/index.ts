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

            console.log(`req.body: ${req.body}`)

            // const settings = await prisma.setting.findMany()
            // console.log(settings)
            // .then((res) => {
            // settings.map(item => {
            //     // console.log(item)
            //     if (item.name === 'settingBusinessName' && item.value !== settingBusinessName) {
            //         prisma.setting.update({
            //             where:  { name  : 'settingBusinessName' },
            //             data:   { value : settingBusinessName  }
            //         })
            //         console.log('asdf')
            //     }
            // })
            // })

            const updateSettingBusinessName = prisma.setting.update({
                where: { name : 'settingBusinessName' },
                data: { value : settingBusinessName }
            })
            const updateSettingBusinessDescription = prisma.setting.update({
                where: { name : 'settingBusinessDescription' },
                data: { value : settingBusinessDescription }
            })
            const updateSettings = await prisma.$transaction([
                updateSettingBusinessName,
                updateSettingBusinessDescription
            ])

            return res.status(200).json(req.body)

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