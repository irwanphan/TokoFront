import type { NextApiRequest, NextApiResponse } from 'next'

const midtransClient = require('midtrans-client');

// Create Snap API instance
let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction : false,
    serverKey : process.env.MID_SERVER_KEY_SANDBOX,
    clientKey : process.env.MID_CLIENT_KEY_SANDBOX,
});
    
let parameter = {
    "transaction_details": {
        "order_id": "1",
        "gross_amount": 30000
    },
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // const getTransactionToken = async () => {
        
    if (req.method === 'GET') {
        try {
            var response = await snap.createTransaction(parameter)
            console.log('response from snap sdk', response)
            // return response.token
            return res.status(200).json({ token: response.token })
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }
    // }

    // getTransactionToken()
}