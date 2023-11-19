import prisma from '@libs/connections/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const query: any = req.query;
    const userId: any = query.userId;

    // Check if the user is authenticated
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // get all purchases for the logged-in user
    if (req.method === 'GET') {
        try {
            const purchases = await prisma.purchase.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    detail: true,
                    shipment: true,
                },
                orderBy: {
                    id: 'desc',
                },
            });
            return res.status(200).json(purchases);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: `${e}` });
        }
    }
}