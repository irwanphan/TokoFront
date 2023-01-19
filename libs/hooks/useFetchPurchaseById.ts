import { PurchasesInterface } from "@interfaces//purchases"
import axios from "axios"
import { useState, useEffect } from "react"

// query single purchase
export const useFetchPurchase = (id:any) => {
    // TODO: purchases type
    const [ purchase, setPurchase ] = useState<PurchasesInterface[]>()
    const [ isLoadingPurchase, setIsLoadingPurchase ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/purchases/get-by-id/?id=${id}`)
                setPurchase(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingPurchase(false)
        }
        fetchData()
    }, [])

    return {
        purchase,
        isLoadingPurchase
    }
}