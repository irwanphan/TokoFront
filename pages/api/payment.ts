import type { NextApiRequest, NextApiResponse } from 'next'

const midtransClient = require('midtrans-client');
const { env } = require('process');
// Create Snap API instance
let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction : false,
    serverKey : "SB-Mid-server-VObmpV75qs9aM13rbzuvD0u4"
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
};
    



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    
        // .then((transaction: any)=>{
        //     // transaction token
        //     let transactionToken = transaction.token;
        //     // console.log('transactionToken:', transactionToken);
        // })

    const getTransactionToken = async () => {
        var response = await snap.createTransaction(parameter)
        console.log('response from snap sdk', response)
        // return response.token
        res.status(200).json({ token: response.token })
    }

    getTransactionToken()
}