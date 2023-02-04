import type { NextApiRequest, NextApiResponse } from 'next'
import { MidtransClient } from 'midtrans-node-client'
// import { v4 as uuidv4 } from 'uuid'

// Sandbox	    POST	https://app.sandbox.midtrans.com/snap/v1/transactions
// Production	POST	https://app.midtrans.com/snap/v1/transactions

// Create Snap API instance
let snap = new MidtransClient.Snap({
    // Set to true if production.
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
            var response = await snap.createTransactionRedirectUrl(parameter)
            console.log('response from snap sdk', response)
            // return response.token
            return res.status(200).json({ token: response })
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: `${e}` })
        }
    }
    // }

    // getTransactionToken()
}