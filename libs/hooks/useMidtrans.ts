import axios from "axios"
import { useState, useEffect } from "react"

const getCurrentTimestamp = () => {
    return "" + Math.round(new Date().getTime() / 1000)
}

export const useMidtrans = () => {

    // useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization:
                            "Basic " +
                            Buffer.from("Mid-server-HIt1rgASZsadjA3GzZrGddi9").toString("base64")
                            // Above is API server key for the Midtrans account, encoded to base64
                    },
                    data: {
                        // Below is the HTTP request body in JSON
                        transaction_details: {
                            order_id: "order-csb-" + getCurrentTimestamp(),
                            gross_amount: 10000
                        },
                        credit_card: {
                            secure: true
                        },
                        customer_details: {
                            first_name: "Johny",
                            last_name: "Kane",
                            email: "testmidtrans@mailnesia.com",
                            phone: "08111222333"
                        }
                    }
                }).then(
                    (snapResponse) => {
                        let snapToken = snapResponse.data.token;
                        console.log("Retrieved snap token:", snapToken);
                        // Pass the Snap Token to frontend, render the HTML page
                        // res.send(getMainHtmlPage(snapToken, handleMainRequest));
                    }
                )
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    // }, [])
}