import { PurchaseInterface } from "@interfaces//purchases"
import axios from "axios"
import { useState, useEffect } from "react"
// query single purchase
export const useFetchPurchaseById = (id:any) => {
    const [ purchase, setPurchase ] = useState<PurchaseInterface>()
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